from django.urls import path
from flights.api.views import *

urlpatterns = [
    path('aircrafts/', aircraftList, name='flights.aircrafts'),
    path('aircrafts/<int:id>', aircraftDetail, name='flights.aircraft'),
    path('', flightList, name='flights.index'),
    path('all/', allFlights, name='flights.all'),
    path('user/<int:id>', userFlights, name='flights.user'),
    path('offer', offerFlights, name='flights.offer'),
    path('<int:id>', flightDetail, name='flight.index'),
    path('user/<int:id>/history/', userBooks, name='user.history'),
    path('<int:id>/history/', flightBooks, name='flight.history'),
    path('class/<int:id>/history/', classBooks, name='class.history'),
    path('history/', bookHistoryList, name='flights.history'),
    path('history/<int:id>', bookHistoryDetail, name='flight.history'),
    path('classes/', classList, name='flights.classes'),
    path('classes/<int:id>', classDetail, name='flights.class'),
    path('reviews/', flightReviewList, name='flights.reviews'),
    path('user/<int:id>/reviews', userFlightReview, name='user.reviews'),
    path('<int:id>/reviews', flightReview, name='flight.reviews'),
    path('reviews/<int:id>', flightReviewDetail, name='flights.review'),
]