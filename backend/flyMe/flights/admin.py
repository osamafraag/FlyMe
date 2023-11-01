from django.contrib import admin
from flights.models import Aircraft, Flight, FlightRoute, Class, BookHistory, BookFight

admin.site.register(Aircraft)
admin.site.register(Flight) 
admin.site.register(FlightRoute)
admin.site.register(Class)
admin.site.register(BookHistory)
admin.site.register(BookFight)
