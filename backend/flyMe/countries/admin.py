from django.contrib import admin

from countries.models import AirPort,Country,TrendingPlace,Route,MultiImagesTrendingPlace,MultiImagesCountry,Event

# Register your models here.

admin.site.register(AirPort)
admin.site.register(Country)  
admin.site.register(TrendingPlace)  
admin.site.register(Route)  
admin.site.register(MultiImagesCountry)
admin.site.register(MultiImagesTrendingPlace)
admin.site.register(Event)