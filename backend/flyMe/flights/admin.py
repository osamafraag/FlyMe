from django.contrib import admin
from flights.models import *

admin.site.register(Aircraft)
admin.site.register(Flight) 
admin.site.register(Class)
admin.site.register(BookHistory)
admin.site.register(FlightReview)
