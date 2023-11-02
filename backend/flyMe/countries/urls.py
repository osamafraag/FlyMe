
from django.urls import path, include
urlpatterns = [
    path('api/', include('countries.api.urls')),
]
