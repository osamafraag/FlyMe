from django.db import models
from countries.models import *
from accounts.models import MyUser
from datetime import datetime
from geopy.distance import geodesic
from django.core.validators import MaxValueValidator, MinValueValidator
from django.core.exceptions import ValidationError


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
    type = [
        ('D', 'Direct'),
        ('T', 'Transient')
    ]
    aircraft = models.ForeignKey(Aircraft,default=1 ,on_delete=models.CASCADE, related_name='flights')
    departureTime = models.DateTimeField(default=datetime.now)
    arrivalTime = models.DateTimeField(default=datetime.now)
    startAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='outFlights')
    endAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='inFlights')
    distance = models.PositiveIntegerField(default=0)
    availableSeats = models.PositiveIntegerField(default=0)
    baseCost = models.PositiveIntegerField(default=1000)

    def __str__(self) :
        return f"From {self.startAirport} To {self.endAirport} "
    
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
        if self.departureTime.timestamp() < datetime.now().timestamp() :
            raise ValidationError({'departureTime':'departureTime can`t be before now'})
        if self.arrivalTime.timestamp() < self.departureTime.timestamp() :
            raise ValidationError({'arrivalTime':'arrivalTime can`t be before departureTime'})
    
    def save(self,update=False, *args, **kwargs):
        if not update:
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

class BookHistory(models.Model):
    paymentMethods=[
        ('W',"Wallet"),
        ('C',"Card")
    ]
    statuses=[
        ('D',"Done"),
        ('S',"Still")
    ]
    passenger = models.ForeignKey(MyUser,default=None,on_delete=models.CASCADE, related_name='bookHistory')
    flight = models.ForeignKey(Flight,null=True,on_delete=models.CASCADE, related_name='flightBooks')
    category = models.ForeignKey(Class,default=1,on_delete=models.CASCADE, related_name='bookHistory')
    bookedAt = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=1, choices=statuses, default='S')
    totalCost = models.PositiveIntegerField(default=0,blank=True)
    cashBack = models.PositiveIntegerField(default=0,blank=True)
    paymentMethod = models.CharField(max_length=1, choices=paymentMethods, default='O')

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
        self.totalCost = self.flight.baseCost + self.flight.baseCost*self.category.additionalCostPercentage/100
        self.cashBack = self.totalCost*0.03

    def save(self, *args, **kwargs):
        self.full_clean()
        flight = Flight.get(self.flight.id)
        if flight.availableSeats == 0 :
            raise ValidationError({'flight':'No Seat Available For This Flight!'})
        super().save(*args, **kwargs)
        flight.endAirport.city.country.popularity = flight.endAirport.city.country.popularity + 1
        flight.endAirport.city.popularity = flight.endAirport.city.popularity + 1
        flight.availableSeats = flight.availableSeats - 1
        flight.save(True)
        flight.endAirport.city.country.save()