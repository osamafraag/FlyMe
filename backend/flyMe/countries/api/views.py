from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from countries.models import *
from countries.api.serializers import *



class EventListCreateView(generics.ListCreateAPIView):
    queryset = Event.objects.all()
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
def popularCountries(request):
    countries = Country.objects.all().order_by('-popularity')[:5]
    serializer_country = CountrySerializer(countries, many=True).data
    for country in serializer_country:
        multi_images = MultiImagesCountry.objects.filter(country=country['id'])
        multi_images_data = MultiImagesSerializerCountry(multi_images, many=True).data
        country['multi_images'] = multi_images_data

    return Response(serializer_country)

class CountryListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all().prefetch_related('trendingPlaces')
    serializer_class = CountrySerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)

        for country in serializer.data:
            country_id = country['id']
            country['multi_images'] = MultiImagesSerializerCountry(
                MultiImagesCountry.objects.filter(country_id=country_id),
                many=True,
                context=self.get_serializer_context()
            ).data

        return Response(serializer.data)

class CountryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        country_id = instance.id
        serializer.data['multi_images'] = MultiImagesSerializerCountry(
            MultiImagesCountry.objects.filter(country=country_id), many=True).data

        return Response(serializer.data)



class AirPortListCreateView(generics.ListCreateAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer

class AirPortRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer



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
                many=True,
                context=self.get_serializer_context()
            ).data

        return Response(serializer.data)

class TrendingPlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrendingPlace.objects.all()
    serializer_class = TrendingPlaceSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        trending_place_id = instance.id
        serializer.data['multi_images'] = MultiImagesSerializerTrendingPlace(
            MultiImagesTrendingPlace.objects.filter(trendingPlace_id=trending_place_id), many=True
        ).data

        return Response(serializer.data)


class RouteListCreateAPIView(APIView):
    def get(self, request):
        routes = Route.objects.all()
        serializer = RouteSerializer(routes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = RouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RouteRetrieveUpdateDestroyAPIView(APIView):
    def get(self, request, pk):
        try:
            route = Route.objects.get(pk=pk)
            serializer = RouteSerializer(route)
            return Response(serializer.data)
        except Route.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            route = Route.objects.get(pk=pk)
            serializer = RouteSerializer(route, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Route.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        try:
            route = Route.objects.get(pk=pk)
            route.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Route.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


class MultiImagesCountryListCreateView(generics.ListCreateAPIView):
    queryset = MultiImagesCountry.objects.all()
    serializer_class = MultiImagesSerializerCountry

class MultiImagesCountryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MultiImagesCountry.objects.all()
    serializer_class = MultiImagesSerializerCountry

class MultiImagesTrendingPlaceListCreateView(generics.ListCreateAPIView):
    queryset = MultiImagesTrendingPlace.objects.all()
    serializer_class = MultiImagesSerializerTrendingPlace

class MultiImagesTrendingPlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = MultiImagesTrendingPlace.objects.all()
    serializer_class = MultiImagesSerializerTrendingPlace


@api_view(['POST', 'PUT', 'DELETE'])
def manage_events_in_country(request, country_id):
    try:
        country = Country.objects.get(pk=country_id)
    except Country.DoesNotExist:
        return Response({"error": "Country not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        event_ids = request.data.get("event_ids", [])
        for event_id in event_ids:
            try:
                event = Event.objects.get(pk=event_id)
                country.event.add(event)
            except Event.DoesNotExist:
                return Response({"error": f"Event with ID {event_id} not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Events added to the country successfully."}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        event_ids = request.data.get("event_ids", [])
        country.event.set(event_ids)
        return Response({"message": "Events replaced in the country successfully."}, status=status.HTTP_200_OK)


    elif request.method == 'DELETE':
        event_ids = request.data.get("event_ids", [])
        for event_id in event_ids:
            try:
                event = Event.objects.get(pk=event_id)
                country.event.remove(event)
            except Event.DoesNotExist:
                return Response({"error": f"Event with ID {event_id} not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Events removed from the country successfully."}, status=status.HTTP_200_OK)




@api_view(['POST', 'PUT', 'DELETE'])
def manage_trending_places_in_country(request, country_id):
    try:
        country = Country.objects.get(pk=country_id)
    except Country.DoesNotExist:
        return Response({"error": "Country not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        trending_place_ids = request.data.get("trending_place_ids", [])
        for place_id in trending_place_ids:
            try:
                place = TrendingPlace.objects.get(pk=place_id)
                country.trendingPlaces.add(place)
            except TrendingPlace.DoesNotExist:
                return Response({"error": f"Trending Place with ID {place_id} not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Trending Places added to the country successfully."}, status=status.HTTP_201_CREATED)

    elif request.method == 'PUT':
        trending_place_ids = request.data.get("trending_place_ids", [])
        country.trendingPlaces.set(trending_place_ids)
        return Response({"message": "Trending Places replaced in the country successfully."}, status=status.HTTP_200_OK)

    elif request.method == 'DELETE':
        trending_place_ids = request.data.get("trending_place_ids", [])
        for place_id in trending_place_ids:
            try:
                place = TrendingPlace.objects.get(pk=place_id)
                country.trendingPlaces.remove(place)
            except TrendingPlace.DoesNotExist:
                return Response({"error": f"Trending Place with ID {place_id} not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response({"message": "Trending Places removed from the country successfully."}, status=status.HTTP_200_OK)