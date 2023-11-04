from django.db import models
from countries.models import Country, Route

class Aircraft(models.Model):

    name = models.CharField(null=False)
    company = models.CharField(null=False)
    capacity = models.IntegerField(null=False)
    maxLoad = models.IntegerField(null=False)
    baggageWeight = models.IntegerField(null=True)
    maxDistance = models.IntegerField(null=False)

    def __str__(self) :
        return self.name

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)
    
class Flight(models.Model):

    departureTime = models.DateTimeField(null=True)
    arrivalTime = models.DateTimeField(null=True)
    availableSeats = models.IntegerField(null=False)
    baseCost = models.IntegerField(null=False)
    baggageWeight = models.IntegerField(null=False)
    totalDistance = models.IntegerField(null=False)
    type = models.BooleanField()
    aircraft = models.ForeignKey(Aircraft,null=True, blank=True,on_delete=models.CASCADE, related_name='flights')
    sourceCountry = models.ForeignKey(Country,null=True, blank=True,on_delete=models.CASCADE, related_name='outcomingFlights')
    destinationCountry = models.ForeignKey(Country,null=True, blank=True,on_delete=models.CASCADE, related_name='incomingFlights')

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)
    
class FlightRoute(models.Model):
    flight = models.ForeignKey(Flight,null=True, blank=True,on_delete=models.CASCADE, related_name='relatedRoutes')
    route = models.ForeignKey(Route,null=True, blank=True,on_delete=models.CASCADE, related_name='relatedFlights')
    index = models.IntegerField(null=False)
    startTime = models.DateTimeField(null=False)
    endTime = models.DateTimeField(null=False)

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)

class Class(models.Model):
    name = models.CharField(null=False)
    additionalCostPercentage = models.IntegerField(null=False)
    seatCategory = models.CharField(null=False)
    mealCategory = models.CharField(null=False)
    mealCategory = models.CharField(null=False)
    wifiAvailability = models.BooleanField()
    powerOutlet = models.BooleanField()
    streamEntertainment = models.BooleanField()

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)

class BookHistory(models.Model):
    # passenger = models.ForeignKey(User,null=True, blank=True,on_delete=models.CASCADE, related_name='bookHistory')
    flight = models.ForeignKey(Flight,null=True, blank=True,on_delete=models.CASCADE, related_name='bookHistory')
    category = models.ForeignKey(Class,null=True, blank=True,on_delete=models.CASCADE, related_name='bookHistory')
    bookedAt = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField()
    totalCost = models.IntegerField()
    cashBack = models.IntegerField()
    paymentMethod = models.BooleanField()

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)

class BookFlight(models.Model):
    flight = models.ForeignKey(Flight,null=True, blank=True,on_delete=models.CASCADE, related_name='flightBooks')
    book = models.ForeignKey(BookHistory,null=True, blank=True,on_delete=models.CASCADE, related_name='bookflights')
    type = models.BooleanField()

    @classmethod
    def all(cls) :
        return cls.objects.all()
    
    @classmethod
    def get(cls,id) :
        return cls.objects.get(id=id)


