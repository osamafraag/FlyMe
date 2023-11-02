from rest_framework import serializers
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImages

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class AirPortSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirPort
        fields = '__all__'

class TrendingPlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrendingPlace
        fields = '__all__'

class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = '__all__'

class MultiImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultiImages
        fields = '__all__'
