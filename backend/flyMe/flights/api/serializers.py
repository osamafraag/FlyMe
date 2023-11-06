from rest_framework import serializers
from flights.models import *


class AircraftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aircraft
        fields = '__all__'

        def create(self, validated_data):
            return Aircraft.objects.create(**validated_data)

class FlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = '__all__'

        def create(self, validated_data):
            return Flight.objects.create(**validated_data)


class FlightRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightRoute
        fields = '__all__'

        def create(self, validated_data):
            return FlightRoute.objects.create(**validated_data)

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

        def create(self, validated_data):
            return Class.objects.create(**validated_data)

class BookHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookHistory
        fields = '__all__'

        def create(self, validated_data):
            return BookHistory.objects.create(**validated_data)

class BookFlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookFlight
        fields = '__all__'

        def create(self, validated_data):
            return BookFlight.objects.create(**validated_data)