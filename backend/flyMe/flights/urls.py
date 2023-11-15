from django.urls import path, include
urlpatterns = [
    path('api/',include('flights.api.urls')),
]