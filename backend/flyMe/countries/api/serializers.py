from rest_framework import serializers
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImagesTrendingPlace,MultiImagesCountry,Event


class EventSerializer(serializers.ModelSerializer):
    sale_amount = serializers.SerializerMethodField()
    class Meta:
        model = Event
        fields = ('id', 'nameEvent','description','startDate','endDate','sale_amount' )
    def get_sale_amount(self, obj):
        return f"{obj.sale_amount:.2f} %"
class MultiImagesSerializerTrendingPlace(serializers.ModelSerializer):
    class Meta:
        model = MultiImagesTrendingPlace
        fields = ('id', 'photo', 'trendingPlace')

class MultiImagesSerializerCountry(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name.name', read_only=True)

    class Meta:
        model = MultiImagesCountry
        fields = ('id', 'photo','country_name')

class CountrySerializer(serializers.ModelSerializer):
    multi_images = MultiImagesSerializerCountry(many=True, read_only=True)
    event = EventSerializer(many=True,read_only=True)
    name = serializers.CharField(source='name.name')


    class Meta:
        model = Country
        fields = ['id','name','flag','callingCode','nationality','multi_images','isFeatured','event']


class AirPortSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name.name', read_only=True)
    

    class Meta:
        model = AirPort
        fields = ('id', 'country_name', 'name', 'latitude', 'longitude')



class TrendingPlaceSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name.name', read_only=True)
    multi_images = MultiImagesSerializerTrendingPlace(many=True, read_only=True)

    class Meta:
        model = TrendingPlace
        fields = ('id', 'name', 'description', 'country_name', 'latitude', 'longitude', 'multi_images')


class RouteSerializer(serializers.ModelSerializer):
    start_airport_name = serializers.SerializerMethodField()
    end_airport_name = serializers.SerializerMethodField()
    distance_km = serializers.SerializerMethodField()

    class Meta:
        model = Route
        fields = ('id', 'start_airport_name', 'end_airport_name', 'distance_km')

    def get_distance_km(self, obj):
        return f"{obj.distance} KM"

    def get_start_airport_name(self, obj):
        start_airport = obj.startAirport
        return f"{start_airport.name} ({start_airport.country})"
    
    def get_end_airport_name(self, obj):
        end_airport = obj.endAirport
        return f"{end_airport.name} ({end_airport.country})"



