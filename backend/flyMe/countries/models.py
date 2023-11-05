from asyncio import exceptions
from django.db import models
from geopy.distance import geodesic
from django_countries.fields import CountryField
    


class Event(models.Model):
    nameEvent = models.CharField(null=False, help_text="Put Name Of Events", max_length=255)
    description = models.TextField(null=True,blank=True)
    startDate = models.DateField(null=True, blank=True)
    endDate = models.DateField(null=True, blank=True)
    sale_amount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.nameEvent

class Country(models.Model):
    name = CountryField(blank_label="(select country)", unique=True)
    flag = models.ImageField(upload_to='countries/photos/')
    callingCode = models.CharField(max_length=5, null=True)
    nationality = models.CharField(max_length=150, null=True, blank=True, help_text="like Egyptian, etc..")
    isFeatured = models.BooleanField(help_text="IF you Choose it , Must Enter Value as Event")
    event = models.ManyToManyField(Event,blank=True)

    def __str__(self):
        return self.name.name

    def save(self, *args, **kwargs):
        if not self.isFeatured:
            self.event.clear()
        elif self.isFeatured and not self.event:
            self.event.clear()
            self.isFeatured = None

        super().save(*args, **kwargs)

class AirPort(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, unique=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return f"{self.name} ({self.country})"
    




class TrendingPlace(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self) :
        return self.name
    


    
class MultiImagesTrendingPlace(models.Model):
    photo = models.ImageField(upload_to='trending_places/photos/')
    trendingPlace = models.ForeignKey(TrendingPlace,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.trendingPlace.name}'
class MultiImagesCountry(models.Model):
    photo = models.ImageField(upload_to='countries/photos/')
    country = models.ForeignKey(Country,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.country}'

    
class Route(models.Model):

    startAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='routes_from')
    endAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='routes_to')
    distance = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, help_text="Distance in kilometers")
    # trending_place = models.ForeignKey(TrendingPlace, on_delete=models.CASCADE, null=True, blank=True)


    def __str__(self):
        return f'From : {self.startAirport} To : {self.endAirport}'
    
    def save(self, *args, **kwargs):

        startCoords = (self.startAirport.latitude, self.startAirport.longitude)
        endCoords = (self.endAirport.latitude, self.endAirport.longitude)
        self.distance = geodesic(startCoords, endCoords).kilometers

        super().save(*args, **kwargs)
