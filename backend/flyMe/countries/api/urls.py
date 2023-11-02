from django.urls import path
from countries.api.views import country_list,country_detail,airport_detail,airport_list,trending_place_detail,trending_place_list,route_detail,route_list,multi_images_detail,multi_images_list

urlpatterns = [
    path('countries/', country_list, name='country-list'),
    path('countries/<int:pk>/', country_detail, name='country-detail'),
    path('airports/', airport_list, name='airport-list'),
    path('airports/<int:pk>/', airport_detail, name='airport-detail'),
    path('trending-places/', trending_place_list, name='trending-place-list'),
    path('trending-places/<int:pk>/', trending_place_detail, name='trending-place-detail'),
    path('routes/', route_list, name='route-list'),
    path('routes/<int:pk>/', route_detail, name='route-detail'),
    path('multi-images/', multi_images_list, name='multi-images-list'),
    path('multi-images/<int:pk>/', multi_images_detail, name='multi-images-detail'),
]
