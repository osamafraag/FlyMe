from rest_framework import serializers
from geopy.distance import geodesic
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
        
        def create(self, validated_data):
            return Country.objects.create(**validated_data)


class AirPortSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name.name', read_only=True)
    country_id = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), source='country', write_only=True)

    

    class Meta:
        model = AirPort
        fields = ('id','country_id', 'country_name', 'name', 'latitude', 'longitude')

        def create(self, validated_data):
            return AirPort.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.country_name =validated_data.get('country_name')
            instance.name =validated_data.get('name')
            instance.latitude =validated_data.get('latitude')
            instance.longitude =validated_data.get('longitude')
            instance.save()
            return instance




class TrendingPlaceSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name.name', read_only=True)
    multi_images = MultiImagesSerializerTrendingPlace(many=True, read_only=True)

    class Meta:
        model = TrendingPlace
        fields = ('id', 'name', 'description', 'country_name', 'latitude', 'longitude', 'multi_images')




class RouteSerializer(serializers.ModelSerializer):
    startAirport_name = serializers.CharField(source='startAirport.name', read_only=True)
    endAirport_name = serializers.CharField(source='endAirport.name', read_only=True)
    distance_with_unit = serializers.SerializerMethodField()

    class Meta:
        model = Route
        fields = ['id', 'startAirport', 'endAirport', 'startAirport_name', 'endAirport_name', 'distance_with_unit']

    def get_distance_with_unit(self, obj):
        distance = obj.distance or 0
        return f'{distance} KM'

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        start_coords = (instance.startAirport.latitude, instance.startAirport.longitude)
        end_coords = (instance.endAirport.latitude, instance.endAirport.longitude)

        distance = geodesic(start_coords, end_coords).kilometers

        representation['startAirport_name'] = instance.startAirport.name
        representation['endAirport_name'] = instance.endAirport.name
        representation['distance_with_unit'] = f'{distance:.2f} KM'

        return representation