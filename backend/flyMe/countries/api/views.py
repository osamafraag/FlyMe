from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from countries.models import *
from countries.api.serializers import *
@api_view(['GET'])
def country_list(request):
    countries = Country.objects.all()
    serializer_country = CountrySerializer(countries, many=True).data

    for country in serializer_country:
        multi_images = MultiImagesCountry.objects.filter(country=country['id'])
        multi_images_data = MultiImagesSerializerCountry(multi_images, many=True).data
        country['multi_images'] = multi_images_data

    return Response(serializer_country)


@api_view(['GET'])
def country_detail(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response("Sorry , This Not Exist",404)
    
    country_data = CountrySerializer(country).data
    multi_images = MultiImagesCountry.objects.filter(country=country)
    multi_images_data = MultiImagesSerializerCountry(multi_images, many=True).data
    country_data['multi_images'] = multi_images_data

    return Response(country_data)



@api_view(['GET', 'POST'])
def airport_list(request):
    airport = AirPort.objects.all()
    
    if request.method == 'GET':
        serializer = AirPortSerializer(airport, many=True) 
        return Response(serializer.data)
    
    elif request.method == 'POST':
        print(request.data)  
        dataAirPort = AirPortSerializer(data=request.data)
        print(dataAirPort.is_valid())  
        if dataAirPort.is_valid():
            dataAirPort.save()
            return Response({"Message": "Data Sent Successfully", "AirPort Data": dataAirPort.data}, 200)
        return Response(dataAirPort.errors, 400)





 
@api_view(['GET','PUT','DELETE'])
def airport_detail(request, id):
    airport = AirPort.objects.filter(id=id).first()

    if request.method == 'GET':
        serializer = AirPortSerializer(airport)
        return Response(serializer.data)

    elif request.method == 'PUT':
        dataUpdated = AirPortSerializer(instance=airport, data=request.data, partial=True)  
        if dataUpdated.is_valid():
            dataUpdated.save()
            return Response({"message": "Edit done", "AirPort Data": dataUpdated.data})
        return Response(dataUpdated.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        airport.delete()
        return Response({"message":"Delete Successfully"}, status=200)



@api_view(['GET'])
def trending_place_list(request):
    places = TrendingPlace.objects.all()
    trending_place_data = TrendingPlaceSerializer(places, many=True).data

    for place in trending_place_data:
        multi_images = MultiImagesTrendingPlace.objects.filter(trendingPlace=place['id'])
        multi_images_data = MultiImagesSerializerTrendingPlace(multi_images, many=True).data
        place['multi_images'] = multi_images_data

    return Response(trending_place_data)

@api_view(['GET'])
def trending_place_detail(request, pk):
    try:
        place = TrendingPlace.objects.get(pk=pk)
    except TrendingPlace.DoesNotExist:
        return Response(status=404)

    multi_images = MultiImagesTrendingPlace.objects.filter(trendingPlace=place)
    trending_place_data = TrendingPlaceSerializer(place).data
    multi_images_data = MultiImagesSerializerTrendingPlace(multi_images, many=True).data
    trending_place_data['multi_images'] = multi_images_data

    return Response(trending_place_data)


@api_view(['GET'])
def multi_images_list_country(request):
    images = MultiImagesCountry.objects.all()
    serializer = MultiImagesSerializerCountry(images, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def multi_images_detail_country(request, pk):
    try:
        image = MultiImagesCountry.objects.get(pk=pk)
    except MultiImagesCountry.DoesNotExist:
        return Response(status=404)

    serializer = MultiImagesSerializerCountry(image)
    return Response(serializer.data)


@api_view(['GET'])
def multi_images_list_trendingPlace(request):
    images = MultiImagesTrendingPlace.objects.all()
    serializer = MultiImagesSerializerTrendingPlace(images, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def multi_images_detail_trendingPlace(request, pk):
    try:
        image = MultiImagesTrendingPlace.objects.get(pk=pk)
    except MultiImagesTrendingPlace.DoesNotExist:
        return Response(status=404)

    serializer = MultiImagesSerializerTrendingPlace(image)
    return Response(serializer.data)


@api_view(['GET'])
def featured_countries_list(request):
    featured_countries = Country.objects.filter(isFeatured=True)
    serializer = CountrySerializer(featured_countries, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def featured_country_detail(request, pk):
    try:
        featured_country = Country.objects.get(pk=pk, isFeatured=True)
    except Country.DoesNotExist:
        return Response("Sorry, This featured country does not exist", status=404)

    serializer = CountrySerializer(featured_country)
    return Response(serializer.data)


@api_view(['GET'])
def event_countries_list(request):
    event_countries = Country.objects.filter(event__isnull=False)
    serializer = CountrySerializer(event_countries, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def event_country_detail(request, pk):
    try:
        event_country = Country.objects.get(pk=pk, event__isnull=False)
    except Country.DoesNotExist:
        return Response("Sorry, This event country does not exist", status=404)

    serializer = CountrySerializer(event_country,many =True)
    return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RouteSerializer

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

    # def delete(self, request, pk):
    #     try:
    #         route = Route.objects.get(pk=pk)
    #         route.delete()
    #         return Response(status=status.HTTP_204_NO_CONTENT)
    #     except Route.DoesNotExist:
    #         return Response(status=status.HTTP_404_NOT_FOUND)

class CountryListCreateAPIView(APIView):
    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CountrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CountryRetrieveUpdateDestroyAPIView(APIView):
    def get(self, request, pk):
        try:
            country = Country.objects.get(pk=pk)
            serializer = CountrySerializer(country)
            return Response(serializer.data)
        except Country.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        try:
            country = Country.objects.get(pk=pk)
            serializer = CountrySerializer(country, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Country.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk):
        try:
            country = Country.objects.get(pk=pk)
            country.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Country.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
