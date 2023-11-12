from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from countries.models import *
from countries.api.serializers import *
from cities_light.models import Country, City


class CountryListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for country in serializer.data:
            country_id = country['id']
            country['multi_images'] = MultiImagesSerializerCountry(
                MultiImagesCountry.objects.filter(country=country_id),
                many=True,context=self.get_serializer_context()).data

        return Response(serializer.data)
class CountryPopularListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all().order_by('-popularity')[:5]
    serializer_class = CountrySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for country in serializer.data:
            country_id = country['id']
            country['multi_images'] = MultiImagesSerializerCountry(
                MultiImagesCountry.objects.filter(country=country_id),
                many=True,context=self.get_serializer_context()).data

        return Response(serializer.data)
class CountryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response([serializer.data,MultiImagesSerializerCountry(
            MultiImagesCountry.objects.filter(country=instance.id), many=True).data])

class CityListCreateView(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for city in serializer.data:
            city_id = city['id']
            city['multi_images'] = MultiImagesSerializerCity(
                MultiImagesCity.objects.filter(city=city_id),
                many=True,context=self.get_serializer_context()).data

        return Response(serializer.data)
class CityPopuarListCreateView(generics.ListCreateAPIView):
    queryset = City.objects.all().order_by('-popularity')[:5]
    serializer_class = CitySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for city in serializer.data:
            city_id = city['id']
            city['multi_images'] = MultiImagesSerializerCity(
                MultiImagesCity.objects.filter(city=city_id),
                many=True,context=self.get_serializer_context()).data

        return Response(serializer.data)

class CityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response([serializer.data,MultiImagesSerializerCity(
            MultiImagesCity.objects.filter(city=instance.id), many=True).data])
@api_view(['GET'])
def countryCities(request,pk):
    cities = City.objects.filter(country=pk)
    serializer = CitySerializer(cities, many=True)
    return Response(serializer.data)
class AirPortListCreateView(generics.ListCreateAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer

class AirPortRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer

@api_view(['GET'])
def countryAirports(request,pk):
    airports = AirPort.objects.filter(id__in=City.objects.filter(country=pk).values('airport'))
    serializer = AirPortSerializer(airports, many=True)
    return Response(serializer.data)
class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventFeaturedListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.filter(isFeatured=True)
    serializer_class = EventSerializer

class EventRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
    
@api_view(['GET'])
def countryEvents(request,pk):
    events = Event.objects.filter(country=pk)
    serializer = EventSerializer(events, many=True)
    return Response(serializer.data)

class TrendingPlaceListCreateView(generics.ListCreateAPIView):
    queryset = TrendingPlace.objects.all()
    serializer_class = TrendingPlaceSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for trending_place in serializer.data:
            trending_place_id = trending_place['id']
            trending_place['multi_images'] = MultiImagesSerializerTrendingPlace(
                MultiImagesTrendingPlace.objects.filter(trendingPlace_id=trending_place_id),
                many=True,context=self.get_serializer_context()).data

        return Response(serializer.data)

class TrendingPlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrendingPlace.objects.all()
    serializer_class = TrendingPlaceSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response([serializer.data,MultiImagesSerializerTrendingPlace(
            MultiImagesTrendingPlace.objects.filter(trendingPlace_id=instance.id), many=True).data])

@api_view(['GET'])
def countryTrendingPlaces(request, pk):
    trendingPlaces = TrendingPlace.objects.filter(id__in=City.objects.filter(country=pk).values('trendingPlaces'))
    serializer = TrendingPlaceSerializer(trendingPlaces, many=True)
    return Response(serializer.data)

class MultiImagesCountryListCreateView(generics.ListCreateAPIView):
    queryset = MultiImagesCountry.objects.all()
    serializer_class = MultiImagesSerializerCountry

class MultiImagesCountryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MultiImagesCountry.objects.all()
    serializer_class = MultiImagesSerializerCountry

@api_view(['GET'])
def countryImages(request, pk):
    images = MultiImagesCountry.objects.filter(country=pk)
    serializer = MultiImagesSerializerCountry(images, many=True)
    return Response(serializer.data)

class MultiImagesCityListCreateView(generics.ListCreateAPIView):
    queryset = MultiImagesCity.objects.all()
    serializer_class = MultiImagesSerializerCity

class MultiImagesCityRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MultiImagesCity.objects.all()
    serializer_class = MultiImagesSerializerCity

@api_view(['GET'])
def cityImages(request, pk):
    images = MultiImagesCity.objects.filter(city=pk)
    serializer = MultiImagesSerializerCity(images, many=True)
    return Response(serializer.data)

class MultiImagesTrendingPlaceListCreateView(generics.ListCreateAPIView):
    queryset = MultiImagesTrendingPlace.objects.all()
    serializer_class = MultiImagesSerializerTrendingPlace

class MultiImagesTrendingPlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MultiImagesTrendingPlace.objects.all()
    serializer_class = MultiImagesSerializerTrendingPlace

@api_view(['GET'])
def trendingPlaceImages(request, pk):
    images = MultiImagesTrendingPlace.objects.filter(trendingPlace=pk)
    serializer = MultiImagesSerializerTrendingPlace(images, many=True)
    return Response(serializer.data)