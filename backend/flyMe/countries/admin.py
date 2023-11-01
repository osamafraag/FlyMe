from django.contrib import admin

from .models import AirPort,Country,TrendingPlace,Route

# Register your models here.

admin.site.register(AirPort)
admin.site.register(Country)  
admin.site.register(TrendingPlace)  
admin.site.register(Route)  