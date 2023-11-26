from django.contrib import admin
from countries.models import *

admin.site.register(AirPort) 
admin.site.register(TrendingPlace) 
admin.site.register(MultiImagesCountry)
admin.site.register(MultiImagesTrendingPlace)
admin.site.register(MultiImagesCity)
admin.site.register(Event)