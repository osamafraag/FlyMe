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
    path('multi_images_country/', MultiImagesCountryListCreateView.as_view(), name='multi-images-country-list-create'),
    path('multi_images_country/<int:pk>/', MultiImagesCountryRetrieveUpdateDestroyView.as_view(), name='multi-images-country-detail'),
    path('multi_images_trending_place/', MultiImagesTrendingPlaceListCreateView.as_view(), name='multi-images-trending-place-list-create'),
    path('multi_images_trending_place/<int:pk>/', MultiImagesTrendingPlaceRetrieveUpdateDestroyView.as_view(), name='multi-images-trending-place-detail'),
    path('popular/',CountryPopularListCreateView.as_view(), name='popular.countries'),
    path('popularCities/',CityPopuarListCreateView.as_view(), name='popular.cities'),
    path('cities/',CityListCreateView.as_view(), name='countries.cities'),
    path('cities/<int:pk>', CityRetrieveUpdateDestroyView.as_view(), name='countries.city')
]