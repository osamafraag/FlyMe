from django.urls import path
from flights.api.views import *

urlpatterns = [
    path('', flightList, name='flights.index'),
    path('<int:id>', flightDetail, name='flight.index'),
    path('aircrafts/', aircraftList, name='flights.aircrafts'),
    path('aircrafts/<int:id>', aircraftDetail, name='flights.aircraft'),
    # path('routes/', flightRouteList, name='flights.routes'),
    # path('routes/<int:id>', flightRouteDetail, name='flights.route'),
    path('history/', bookHistoryList, name='flights.history'),
    path('history/<int:id>', bookHistoryDetail, name='flight.history'),
    path('classes/', classList, name='flights.classes'),
    path('classes/<int:id>', classDetail, name='flights.class'),
]