from django.db import models
from countries.models import *
from accounts.models import MyUser, Transaction
from datetime import datetime
from geopy.distance import geodesic
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError
from accounts.models import Notification


class Aircraft(models.Model):
    companies = [
        ('A', 'Airbus'),
        ('B', 'Boeing'),
        ('L', 'Lockheed Martin'),
        ('R', 'Raytheon')
    ]
    name = models.CharField(default='noName',unique=True)
    company = models.CharField(max_length=1, choices=companies, default='A')
    capacity = models.PositiveIntegerField(default=100)
    maxLoad = models.PositiveIntegerField(default=10)
    baggageWeight = models.PositiveIntegerField(default=20)
    maxDistance = models.PositiveIntegerField(default=1000)

    def __str__(self) :
        return self.name

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)
    
class Flight(models.Model):
    statuses = [
        ('A', 'Active'),
        ('C', 'cancelled')
    ]
    aircraft = models.ForeignKey(Aircraft,default=1 ,on_delete=models.CASCADE, related_name='flights')
    departureTime = models.DateTimeField(default=datetime.now)
    arrivalTime = models.DateTimeField(default=datetime.now)
    startAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='outFlights')
    endAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='inFlights')
    distance = models.PositiveIntegerField(default=0)
    availableSeats = models.PositiveIntegerField(default=0)
    baseCost = models.PositiveIntegerField(default=1000)
    offerPercentage = models.PositiveIntegerField(default=0,validators=[MaxValueValidator(99)])
    status = models.CharField(max_length=1, choices=statuses, default='M')

    def __str__(self) :
        return f"From {self.startAirport} To {self.endAirport} At {self.departureTime}"
    
    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)
    
    def clean(self):
        self.availableSeats = self.aircraft.capacity
        startCoords = (self.startAirport.city.latitude, self.startAirport.city.longitude)
        endCoords = (self.endAirport.city.latitude, self.endAirport.city.longitude)
        self.distance = geodesic(startCoords, endCoords).kilometers
        if self.distance > self.aircraft.maxDistance:
            raise ValidationError({'aircraft':'aircraft max distance is less than flight distance'})
        if self.departureTime.timestamp() < datetime.now().timestamp() :
            raise ValidationError({'departureTime':'departureTime can`t be before now'})
        if self.arrivalTime.timestamp() < self.departureTime.timestamp() :
            raise ValidationError({'arrivalTime':'arrivalTime can`t be before departureTime'})
        
    
    def save(self,update=True, *args, **kwargs):
        if update:
            if self.status == 'C':
                books = BookHistory.objects.filter(flight=self.id)
                for book in books.all():
                    notify = Notification()
                    notify.user = book.passenger
                    notify.title = 'Flight Canceled'
                    notify.description = f'sorry but your flight from {self.startAirport.city} to {self.endAirport.city} at {self.departureTime} is canceld'
                    notify.save()
                    book.passenger.wallet.available_balance += book.totalCost
                    book.passenger.wallet.pendding_balance -= book.cashBack
                    book.passenger.save()
                    book.status = 'C'
                    book.save(True)
            
        else:    
            self.full_clean()
        super().save(*args, **kwargs)
        
class Class(models.Model):
    seatCategories = [
        ('E', 'Economy Class Seats'),
        ('P', 'Premium Economy Class Seats'),
        ('B', 'Business Class Seats'),
        ('F', 'First-Class Seats')
    ]
    mealCategories = [
        ('S', 'Standard vegetarian.'),
        ('V', 'Vegan'),
        ('F', 'Fruit platter'),
        ('R', 'Raw vegetable'),
        ('M', 'Muslim meal')
    ]
    drinkCategories = [
        ('O', 'Only water'),
        ('W', 'Warm Drinks only'),
        ('C', 'Cold drinks only'),
        ('B', 'Both Cold and Warm drinks')
    ]
    name = models.CharField(default='noName')
    additionalCostPercentage = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(70)])
    seatCategory = models.CharField(max_length=1, choices=seatCategories, default='E')
    mealCategory = models.CharField(max_length=1, choices=mealCategories, default='M')
    drinkCategory = models.CharField(max_length=1, choices=drinkCategories, default='O')
    wifiAvailability = models.BooleanField(default=False)
    powerOutlet = models.BooleanField(default=False)
    streamEntertainment = models.BooleanField(default=False)

    def __str__(self) :
        return self.name

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)

class FlightReview(models.Model):
    passenger = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE, related_name='reviews')
    comment = models.TextField()
    rate = models.PositiveBigIntegerField(validators=[MinValueValidator(0), MaxValueValidator(5)]) 
    
    def clean(self):
        if self.flight.arrivalTime.timestamp() > datetime.now().timestamp():
            raise ValidationError({'flight':'can`t rate or comment on comming flight'})
        
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

class BookHistory(models.Model):
    paymentMethods=[
        ('W',"Wallet"),
        ('C',"Card")
    ]
    statuses=[
        ('C',"Cancelled"),
        ('A',"Active"),
    ]
    passenger = models.ForeignKey(MyUser,default=None,on_delete=models.CASCADE, related_name='bookHistory')
    flight = models.ForeignKey(Flight,null=True,on_delete=models.CASCADE, related_name='flightBooks')
    category = models.ForeignKey(Class,default=1,on_delete=models.CASCADE, related_name='bookHistory')
    bookedAt = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=statuses, default='A')
    totalCost = models.PositiveIntegerField(default=0,blank=True)
    cashBack = models.PositiveIntegerField(default=0,blank=True)
    paymentMethod = models.CharField(max_length=1, choices=paymentMethods, default='W')
    adults = models.PositiveBigIntegerField(default=1)
    kids = models.PositiveBigIntegerField(default=0)
    infants = models.PositiveBigIntegerField(default=0)

    class Meta:
        unique_together = ('flight', 'passenger',)

    def __str__(self) :
        return f"Booked by {self.passenger} At ({self.bookedAt})"

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)
    
    def clean(self):
        flight = Flight.get(self.flight.id)
        if flight.availableSeats < self.adults + self.kids + self.infants :
            raise ValidationError({'flight':'No enough Seat Available For This Flight!'})
        if flight.status == 'C' :
            raise ValidationError({'flight':'can not book canceld flights'})
        if flight.departureTime.timestamp() < datetime.now().timestamp() :
            raise ValidationError({'flight':'can not book passed flights'})
        self.totalCost = (self.flight.baseCost + self.flight.baseCost*self.category.additionalCostPercentage/100)*(self.adults + 0.7*self.kids + 0.5*self.infants)
        self.cashBack = self.totalCost*0.03
        if self.paymentMethod == 'W':
            self.passenger.wallet.pendding_balance += self.cashBack
            self.passenger.save()
            transaction = Transaction()
            transaction.user=self.passenger
            
            transaction.type = 'WPURCHASE'
            transaction.amount = self.totalCost
            transaction.save()
        elif self.paymentMethod == 'C':
            transaction = Transaction()
            transaction.user=self.passenger
            transaction.amount = self.totalCost
            transaction.type = "CPURCHASE"
            transaction.save()

    def save(self,update=False ,*args, **kwargs):
        if update:
            super().save(*args, **kwargs)
        else:
            self.full_clean()
            super().save(*args, **kwargs)
            flight = Flight.get(self.flight.id)
            flight.endAirport.city.country.popularity = flight.endAirport.city.country.popularity + 1
            flight.endAirport.city.popularity = flight.endAirport.city.popularity + 1
            flight.availableSeats = flight.availableSeats - (self.adults + self.kids + self.infants)
            flight.save(True)
            flight.endAirport.city.country.save()
            flight.endAirport.city.save()


# import schedule

# def job():
#     print("Hello, world!")

# schedule.every().day.at("10:00").do(job)

# while True:
#     schedule.run_pending()