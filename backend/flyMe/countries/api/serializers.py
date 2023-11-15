from rest_framework import serializers
from countries.models import *
from cities_light.models import City, Country


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'nameEvent','description','startDate','endDate','sale_amount' )

    def create(self, validated_data):
        return Event.objects.create(**validated_data)
    def to_internal_value(self, data):
        data = data.copy()
        sale_amount = data.get('sale_amount')
        
        if sale_amount:
            sale_amount = float(sale_amount.rstrip('%')) / 100.0
            data['sale_amount'] = sale_amount

        return super().to_internal_value(data)
    
class AirPortSerializer(serializers.ModelSerializer):
    cityName = serializers.SerializerMethodField(source='city')
    countryName = serializers.SerializerMethodField(source='city')

    class Meta:
        model = AirPort
        fields = ('id', 'name','city', 'cityName', 'countryName')

        def create(self, validated_data):
            return AirPort.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.city =validated_data.get('city')
            instance.name =validated_data.get('name')
            instance.save()
            return instance
        
    def get_cityName(self, instance):
        return instance.city.name
    
    def get_countryName(self, instance):
        return instance.city.country.name


class TrendingPlaceSerializer(serializers.ModelSerializer):
    cityName = serializers.SerializerMethodField(source='city')
    countryName = serializers.SerializerMethodField(source='city')

    class Meta:
        model = TrendingPlace
        fields = ('id', 'name', 'description','city', 'cityName', 'countryName')

    def create(self, validated_data):
        return TrendingPlace.objects.create(**validated_data)

    def get_cityName(self, instance):
        return instance.city.name
    
    def get_countryName(self, instance):
        return instance.city.country.name
    
class MultiImagesSerializerCountry(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)

    class Meta:
        model = MultiImagesCountry
        fields = ('id', 'photo', 'country_name')

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation


class MultiImagesSerializerCity(serializers.ModelSerializer):
    cityName = serializers.CharField(source='city.name', read_only=True)

    class Meta:
        model = MultiImagesCity
        fields = ('id', 'photo','cityName')


class MultiImagesSerializerTrendingPlace(serializers.ModelSerializer):
    place_name = serializers.CharField(source='trendingPlace.name', read_only=True)

    class Meta:
        model = MultiImagesTrendingPlace
        fields = ('id', 'photo','place_name')