from django.db import models
from geopy.distance import geodesic







#create Counrty model
class Country(models.Model):
    id = models.CharField(max_length=3, primary_key=True)
    name = models.CharField(max_length=150, unique=True)
    flag = models.ImageField(upload_to='countries/photos/')
    calling_code = models.CharField(max_length=5)  
    nationality= models.CharField(max_length=150,null=True, blank=True, help_text="like Egyption, etc..")


    def __str__(self) :
        return self.name



#create AirPort Model 
class AirPort(models.Model):
    id = models.CharField(max_length=4,primary_key=True )
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, unique=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return self.name
    



#create TrendingPlaces
class TrendingPlace(models.Model):
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()
    photo = models.ImageField(upload_to='trending_places/photos/')
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self) :
        return self.name
    
#create Route Model
class Route(models.Model):

    start_airport = models.ForeignKey(AirPort, on_delete=models.CASCADE, related_name='routes_from')
    end_airport = models.ForeignKey(AirPort, on_delete=models.CASCADE, related_name='routes_to')
    # trending_place = models.ForeignKey(TrendingPlace, on_delete=models.CASCADE, null=True, blank=True)
    distance = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, help_text="Distance in kilometers")

    def __str__(self):
        return f'From : {self.start_airport} To : {self.end_airport}'
    
    def save(self, *args, **kwargs):

        start_coords = (self.start_airport.latitude, self.start_airport.longitude)
        end_coords = (self.end_airport.latitude, self.end_airport.longitude)
        self.distance = geodesic(start_coords, end_coords).kilometers

        super().save(*args, **kwargs)
