from django.urls import path
from countries.api.views import *


urlpatterns = [
    path('', CountryListCreateView.as_view(), name='country-list-create'),
    path('<int:pk>/', CountryRetrieveUpdateDestroyView.as_view(), name='country-retrieve-update-destroy'),
    path('popular/',CountryPopularListCreateView.as_view(), name='popular.countries'),
    path('cities/',CityListCreateView.as_view(), name='countries.cities'),
    path('cities/<int:pk>', CityRetrieveUpdateDestroyView.as_view(), name='countries.city'),
    path('<int:pk>/cities/', countryCities, name='country.cities'),
    path('cities/popular/',CityPopuarListCreateView.as_view(), name='popular.cities'),
    path('events/', EventListCreateView.as_view(), name='event-list-create'),
    path('<int:pk>/events/', countryEvents, name='country.events'),
    path('events/<int:pk>/', EventRetrieveUpdateDestroyView.as_view(), name='event-retrieve-update-destroy'),
    path('events/featured/', EventFeaturedListCreateView.as_view(), name='event.featured'),
    path('airports/', AirPortListCreateView.as_view(), name='airport-list-create'),
    path('<int:pk>/airports/', countryAirports, name='country.airports'),
    path('airports/<int:pk>/', AirPortRetrieveUpdateDestroyView.as_view(), name='airport-retrieve-update-destroy'),
    path('trendingPlaces/', TrendingPlaceListCreateView.as_view(), name='trending-place-list-create'),
    path('trendingPlaces/<int:pk>', TrendingPlaceRetrieveUpdateDestroyView.as_view(), name='trending-place-retrieve-update-destroy'),
    path('<int:pk>/trendingPlaces/', countryTrendingPlaces, name='country.trendingPlaces'),
    path('images/add/', MultiImagesCountryListCreateView.as_view(), name='multi-images-country-list-create'),
    path('<int:pk>/images/', countryImages, name='country.images'),
    path('images/<int:pk>/', MultiImagesCountryRetrieveUpdateDestroyView.as_view(), name='multi-images-country-detail'),
    path('cities/images/add/', MultiImagesCityListCreateView.as_view(), name='multi-images-country-list-create'),
    path('cities/<int:pk>/images/', cityImages, name='city.images'),
    path('cities/images/<int:pk>/', MultiImagesCityRetrieveUpdateDestroyView.as_view(), name='cities.image'),
    path('trendingPlaces/images/add/', MultiImagesTrendingPlaceListCreateView.as_view(), name='multi-images-country-list-create'),
    path('trendingPlaces/<int:pk>/images/', trendingPlaceImages, name='trendingPlace.images'),
    path('trendingPlaces/images/<int:pk>', MultiImagesTrendingPlaceRetrieveUpdateDestroyView.as_view(), name='multi-images-trending-place-detail'),    
]
