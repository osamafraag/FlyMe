from rest_framework import serializers
from geopy.distance import geodesic
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImagesTrendingPlace,MultiImagesCountry,Event


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

class MultiImagesSerializerTrendingPlace(serializers.ModelSerializer):
    class Meta:
        model = MultiImagesTrendingPlace
        fields = ('id', 'photo', 'trendingPlace')

# class MultiImagesSerializerCountry(serializers.ModelSerializer):
#     country_name = serializers.CharField(source='country.name', read_only=True)

#     class Meta:
#         model = MultiImagesCountry
#         fields = ('id', 'photo','country_name')
#     def to_representation(self, instance):
#         representation = super().to_representation(instance)
#         representation['photo_url'] = instance.photo.url
#         return representation


# class CountrySerializer(serializers.ModelSerializer):
#     multi_images = MultiImagesSerializerCountry(many=True, read_only=True)
#     event = EventSerializer(many=True,read_only=True)


#     class Meta:
#         model = Country
#         fields = ['id','name','flag','callingCode','nationality','multi_images','isFeatured','event']
#         # fields = '__all__'
        
    
#     def create(self, validated_data):
#         events_data = validated_data.pop('event', [])
#         country = Country.objects.create(**validated_data)
#         country.event.set(events_data)
#         return country
class MultiImagesSerializerCountry(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField(read_only=True)
    country_name = serializers.CharField(source='country.name', read_only=True)

    class Meta:
        model = MultiImagesCountry
        fields = ('id', 'photo', 'photo_url', 'country_name')

    def get_photo_url(self, instance):
        return instance.photo.url

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return representation


class CountrySerializer(serializers.ModelSerializer):
    multi_images = MultiImagesSerializerCountry(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ['id', 'name', 'flag', 'callingCode', 'nationality', 'multi_images', 'isFeatured', 'event']
    
    def create(self, validated_data):
        events_data = validated_data.pop('event', [])
        country = Country.objects.create(**validated_data)
        country.event.set(events_data)
        return country

class AirPortSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)
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
    country_id = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all(), source='country', write_only=True)


    class Meta:
        model = TrendingPlace
        fields = ('id', 'name', 'description','country_id', 'country_name', 'latitude', 'longitude', 'multi_images')
    def create(self, validated_data):
        return TrendingPlace.objects.create(**validated_data)
 


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

    def get_distance_with_unit(self, obj):
        start_airport = obj.startAirport
        end_airport = obj.endAirport

        if start_airport and end_airport:
            start_coords = (start_airport.latitude, start_airport.longitude)
            end_coords = (end_airport.latitude, end_airport.longitude)
            distance = geodesic(start_coords, end_coords).kilometers
            return f'{distance:.2f} KM'
        else:
            return 'N/A' 