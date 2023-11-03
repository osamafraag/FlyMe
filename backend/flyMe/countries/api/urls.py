from django.urls import path
from countries.api.views import country_list,country_detail,airport_detail,airport_list, multi_images_detail_country, multi_images_detail_trendingPlace, multi_images_list_country, multi_images_list_trendingPlace,trending_place_detail,trending_place_list,route_detail,route_list
urlpatterns = [
    path('countries/', country_list, name='country-list'),
    path('countries/<int:pk>/', country_detail, name='country-detail'),
    path('airports/', airport_list, name='airport-list'),
    path('airports/<int:pk>/', airport_detail, name='airport-detail'),
    path('trending_places/', trending_place_list, name='trending-place-list'),
    path('trending_places/<int:pk>/', trending_place_detail, name='trending-place-detail'),
    path('routes/', route_list, name='route-list'),
    path('routes/<int:pk>/', route_detail, name='route-detail'),
    path('multi_images/country/', multi_images_list_country, name='multi_images_list_country'),
    path('multi_images/country/<int:pk>/', multi_images_detail_country, name='multi_images_detail_country'),
    path('multi_images/trendingPlace/', multi_images_list_trendingPlace, name='multi_images_list_trendingPlace'),
    path('multi_images/trendingPlace/<int:pk>/', multi_images_detail_trendingPlace, name='multi_images_detail_trendingPlace'),


]
