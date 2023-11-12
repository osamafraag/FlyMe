from django.db import models
    


class Event(models.Model):
    nameEvent = models.CharField(null=False, help_text="Put Name Of Events", max_length=255)
    description = models.TextField(null=True,blank=True)
    startDate = models.DateField(null=True, blank=True)
    endDate = models.DateField(null=True, blank=True)
    sale_amount = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    country = models.ForeignKey('cities_light.Country', on_delete=models.SET_NULL, null=True, blank=True,related_name='events')
    isFeatured = models.BooleanField(default=False)

    def __str__(self):
        return self.nameEvent
    
class AirPort(models.Model):
    city = models.OneToOneField('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True,related_name='airport')
    name = models.CharField(max_length=150, unique=True)

    def __str__(self):
        return self.name
    
class TrendingPlace(models.Model):
    city = models.ForeignKey('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True,related_name='trendingPlaces')
    name = models.CharField(max_length=150, unique=True)
    description = models.TextField()

    def __str__(self) :
        return self.name
    

class MultiImagesCountry(models.Model):
    photo = models.ImageField(upload_to='countries/photos/')
    country = models.ForeignKey('cities_light.Country', on_delete=models.SET_NULL, null=True, blank=True,related_name='images')

    def __str__(self):
        return f'{self.photo} - Name Of Countries : {self.country}'
    
class MultiImagesCity(models.Model):
    photo = models.ImageField(upload_to='cities/photos/')
    city = models.ForeignKey('cities_light.City',on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.city.name}'
    
class MultiImagesTrendingPlace(models.Model):
    photo = models.ImageField(upload_to='trending_places/photos/')
    trendingPlace = models.ForeignKey(TrendingPlace,on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.photo} - Name Of TrendingPlace : {self.trendingPlace.name}'
    

