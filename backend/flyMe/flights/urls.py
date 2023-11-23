from django.urls import path, include
from .views import paypal
urlpatterns = [
    path('api/',include('flights.api.urls')),
    path('paypal/',paypal,name='paypal'),
]