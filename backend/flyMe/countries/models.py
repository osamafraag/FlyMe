from django.db import models
from geopy.distance import geodesic







class Country(models.Model):
    name = models.CharField(max_length=150, unique=True)
    flag = models.ImageField(upload_to='countries/photos/')
    callingCode = models.CharField(max_length=5,null=True)  
    nationality= models.CharField(max_length=150,null=True, blank=True, help_text="like Egyption, etc..")


    def __str__(self) :
        return self.name



class AirPort(models.Model):
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, unique=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.name
    




class TrendingPlace(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self) :
        return self.name
    


    
class MultiImages(models.Model):
    photo = models.ImageField(upload_to='trending_places/photos/')
    trendingPlace = models.ForeignKey(TrendingPlace,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.trendingPlace.name}'

    
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
