from django.urls import path
from countries.api.views import *
urlpatterns = [
    # path('countries/', country_list, name='country-list'),
    # path('countries/<int:pk>/', country_detail, name='country-detail'),
    path('airports/', airport_list, name='airport-list'),
    path('airports/<int:id>/', airport_detail, name='airport-list'),
    path('trending_places/', trending_place_list, name='trending-place-list'),
    path('trending_places/<int:pk>/', trending_place_detail, name='trending-place-detail'),
    path('multi_images/country/', multi_images_list_country, name='multi_images_list_country'),
    path('multi_images/country/<int:pk>/', multi_images_detail_country, name='multi_images_detail_country'),
    path('multi_images/trendingPlace/', multi_images_list_trendingPlace, name='multi_images_list_trendingPlace'),
    path('multi_images/trendingPlace/<int:pk>/', multi_images_detail_trendingPlace, name='multi_images_detail_trendingPlace'),
    path('featured_countries/',featured_countries_list, name='featured_countries_list'),
    path('featured_countries/<int:pk>/',featured_country_detail, name='featured_country_detail'),
    path('event_countries/',event_countries_list, name='event_countries_list'),
    path('event_countries/<int:pk>',event_country_detail, name='event_countries_list'),
    #_____________________________
    path('routes/', RouteListCreateAPIView.as_view(), name='route-list-create'),
    path('routes/<int:pk>/', RouteRetrieveUpdateDestroyAPIView.as_view(), name='route-retrieve-update-destroy'),
    path('countries/', CountryListCreateAPIView.as_view(), name='country-list-create'),
    path('countries/<int:pk>/', CountryRetrieveUpdateDestroyAPIView.as_view(), name='country-retrieve-update-destroy'),




]