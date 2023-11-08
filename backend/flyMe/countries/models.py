from django.db import models
    


class Event(models.Model):
    nameEvent = models.CharField(null=False, help_text="Put Name Of Events", max_length=255)
    description = models.TextField(null=True,blank=True)
    startDate = models.DateField(null=True, blank=True)
    endDate = models.DateField(null=True, blank=True)
    sale_amount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.nameEvent

class Country(models.Model):
    name = models.CharField(max_length=150,unique=True)
    flag = models.ImageField(upload_to='countries/photos/',null=True)
    callingCode = models.CharField(max_length=10, null=True)
    nationality = models.CharField(max_length=150, null=True, blank=True, help_text="like Egyptian, etc..")
    isFeatured = models.BooleanField(help_text="IF you Choose it , Must Enter Value as Event")
    event = models.ManyToManyField(Event,blank=True,default=None)
    popularity = models.PositiveBigIntegerField(default=0)
    trendingPlaces = models.ManyToManyField('TrendingPlace', related_name='countries', blank=True)

    def __str__(self):
        return self.name

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
    photo = models.ImageField(upload_to='trending_places/photos/',null=True)
    trendingPlace = models.ForeignKey(TrendingPlace,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.trendingPlace.name}'
    


class MultiImagesCountry(models.Model):
    photo = models.ImageField(upload_to='countries/photos/',null=True)
    country = models.ForeignKey(Country,on_delete=models.CASCADE,null=True)

    def __str__(self):
        return f'{self.photo} - Name Of Countries : {self.country}'

    
class Route(models.Model):

    startAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='routes_from')
    endAirport = models.ForeignKey(AirPort, on_delete=models.CASCADE,null=True, related_name='routes_to')
    distance = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True, help_text="Distance in kilometers")


    def __str__(self):
        return f'From : {self.startAirport} To : {self.endAirport}'
    
    class Meta:
        unique_together = ['startAirport', 'endAirport']
        