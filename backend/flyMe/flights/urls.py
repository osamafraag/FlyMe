from django.urls import path, include
urlpatterns = [
    path('apis/',include('flights.api.urls')),
]