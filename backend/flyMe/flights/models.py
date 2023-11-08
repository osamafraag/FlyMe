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
    # type = models.CharField(max_length=1, choices=type, default='D')
    # sourceCity = models.ForeignKey('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True,related_name='outcomingFlights') 
    # destinationCity = models.ForeignKey('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True,related_name='incomingFlights')
    # sourceCountry = models.ForeignKey(Country,default=1,on_delete=models.CASCADE, related_name='outcomingFlights')
    # destinationCountry = models.ForeignKey(Country,default=1,on_delete=models.CASCADE, related_name='incomingFlights')
    # baggageWeight = models.PositiveIntegerField(default=0)

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
    #     if self.departureTime.timestamp() < datetime.now().timestamp() :
    #         raise ValidationError({'departureTime':'departureTime can`t be before now'})
    #     if self.arrivalTime.timestamp() < self.departureTime.timestamp() :
    #         raise ValidationError({'arrivalTime':'arrivalTime can`t be before departureTime'})
    #     if self.baggageWeight > self.aircraft.baggageWeight:
    #         raise ValidationError({'baggageWeight':'flight baggageWeight can`t be bigger than aircraft baggageWeight'})
    #     if self.baggageWeight == 0 :
    #         self.baggageWeight = self.aircraft.baggageWeight
    
    def save(self,update=False, *args, **kwargs):
        if not update:
            self.full_clean()
        super().save(*args, **kwargs)
        
    
# class FlightRoute(models.Model):
#     flight = models.ForeignKey(Flight,default=1,on_delete=models.CASCADE, related_name='relatedRoutes')
#     route = models.ForeignKey(Route,default=1,on_delete=models.CASCADE, related_name='relatedFlights')
#     index = models.PositiveIntegerField(default=1)
#     startTime = models.DateTimeField(default=datetime.now)
#     endTime = models.DateTimeField(default=datetime.now)

#     class Meta:
#         unique_together = ('flight', 'route',)

#     def __str__(self) :
#         return f"Route number {self.index} for Flight ({self.flight}) "

#     @classmethod
#     def all(cls) :
#         return cls.objects.all()
    
#     @classmethod
#     def get(cls,id) :
#         return cls.objects.get(id=id)
    
#     def clean(self):
#         if self.startTime.timestamp() < datetime.now().timestamp() :
#             raise ValidationError({'startTime':'startTime can`t be before now'})
#         if self.route.distance > self.flight.aircraft.maxDistance :
#             raise ValidationError({'flight':'route destinace can`t be bigger than aircraft distance'})
#         if self.flight.departureTime.timestamp() < datetime.now().timestamp() :
#             raise ValidationError({'flight':'can`t add route to passsed flight'})
#         flightRoutes = FlightRoute.objects.filter(flight=self.flight)
#         if self.flight.type == 'D' and flightRoutes.count() == 1:
#             raise ValidationError({'flight':'can`t add more than one route to direct flights'})
#         if flightRoutes.count() > 0:
#             lastFlightRoute = flightRoutes.order_by('-index')[:1][0]
#             lastFlightRoute.endTime = self.startTime
#             lastFlightRoute.save(True)
#             self.index = flightRoutes.count() + 1
#         else :
#             self.index == 1 
#             if self.route.startAirport.country != self.flight.sourceCountry :
#                 raise ValidationError({'route':'route start country must be the same as fight start country'})
#             self.startTime = self.flight.departureTime
#         self.endTime = self.flight.arrivalTime
        
    
#     def save(self,update = False, *args, **kwargs):
#         if not update :
#             self.full_clean()
#         super().save(*args, **kwargs)
#         self.flight.totalDistance = 0
#         for route in self.flight.relatedRoutes.all():
#             self.flight.totalDistance += route.route.distance
#             self.flight.save()

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
        super().save(*args, **kwargs)
        flight = Flight.get(self.flight.id)
        flight.endAirport.city.country.popularity = flight.endAirport.city.country.popularity + 1
        flight.availableSeats = flight.availableSeats - 1
        flight.save(True)
        flight.endAirport.city.country.save()