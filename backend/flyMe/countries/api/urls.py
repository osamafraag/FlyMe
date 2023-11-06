from django.urls import path
from countries.api.views import *


urlpatterns = [
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='event-retrieve-update-destroy'),
    path('countries/', CountryListCreateView.as_view(), name='country-list-create'),
    path('countries/<int:pk>/', CountryRetrieveUpdateDestroyView.as_view(), name='country-retrieve-update-destroy'),
    path('airports/', AirPortListCreateView.as_view(), name='airport-list-create'),
    path('airports/<int:pk>/', AirPortRetrieveUpdateDestroyView.as_view(), name='airport-retrieve-update-destroy'),
    path('trending_places/', TrendingPlaceListCreateView.as_view(), name='trending-place-list-create'),
    path('trending_places/<int:pk>/', TrendingPlaceRetrieveUpdateDestroyView.as_view(), name='trending-place-retrieve-update-destroy'),
    path('routes/', RouteListCreateAPIView.as_view(), name='route-list-create'),
    path('routes/<int:pk>/', RouteRetrieveUpdateDestroyAPIView.as_view(), name='route-retrieve-update-destroy'),

]