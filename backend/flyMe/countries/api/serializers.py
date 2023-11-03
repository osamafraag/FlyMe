from rest_framework import serializers
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImages

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class AirPortSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)

    class Meta:
        model = AirPort
        fields = '__all__'

class MultiImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultiImages
        fields = ('id', 'photo', 'trendingPlace')


class TrendingPlaceSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)
    multi_images = MultiImagesSerializer(many=True, read_only=True)

    class Meta:
        model = TrendingPlace
        fields = ('id', 'name', 'description', 'country_name', 'latitude', 'longitude', 'multi_images')


class RouteSerializer(serializers.ModelSerializer):
    start_airport_name = serializers.CharField(source='startAirport.name', read_only=True)
    end_airport_name = serializers.CharField(source='endAirport.name', read_only=True)
    distance_km = serializers.SerializerMethodField()

    class Meta:
        model = Route
        fields = ('id', 'start_airport_name', 'end_airport_name', 'distance_km')

    def get_distance_km(self, obj):
        return f"{obj.distance} KM"


