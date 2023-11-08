from django.contrib import admin

from countries.models import *

# Register your models here.

admin.site.register(AirPort) 
admin.site.register(TrendingPlace) 
admin.site.register(MultiImagesCountry)
admin.site.register(MultiImagesTrendingPlace)
admin.site.register(Event)