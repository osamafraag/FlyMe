from rest_framework import serializers
from flights.models import *
from django.core.exceptions import *


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

class ClassSerializer(serializers.ModelSerializer):
    class Meta:
        model = Class
        fields = '__all__'

        def create(self, validated_data):
            return Class.objects.create(**validated_data)
        
class FlightReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightReview
        fields = '__all__'

        def create(self, validated_data):
            return FlightReview.objects.create(**validated_data)

class BookHistorySerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name',read_only=True)
    class Meta:
        model = BookHistory
        # fields = '__all__'
        fields = ['passenger','flight','category','category_name','status','totalCost','cashBack','paymentMethod','adults','kids','infants']

        def create(self, validated_data):
            return BookHistory.objects.create(**validated_data)
