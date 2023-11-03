from rest_framework.decorators import api_view
from rest_framework.response import Response
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImages
from countries.api.serializers import CountrySerializer, AirPortSerializer, TrendingPlaceSerializer, RouteSerializer, MultiImagesSerializer

@api_view(['GET'])
def country_list(request):
    countries = Country.objects.all()
    serializer = CountrySerializer(countries, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def country_detail(request, pk):
    try:
        country = Country.objects.get(pk=pk)
    except Country.DoesNotExist:
        return Response(status=404)

    serializer = CountrySerializer(country)
    return Response(serializer.data)

@api_view(['GET'])
def airport_list(request):
    airports = AirPort.objects.all()
    serializer = AirPortSerializer(airports, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def airport_detail(request, pk):
    try:
        airport = AirPort.objects.get(pk=pk)
    except AirPort.DoesNotExist:
        return Response(status=404)

    serializer = AirPortSerializer(airport)
    return Response(serializer.data)

@api_view(['GET'])
def trending_place_list(request):
    places = TrendingPlace.objects.all()
    trending_place_data = TrendingPlaceSerializer(places, many=True).data

    for place in trending_place_data:
        multi_images = MultiImages.objects.filter(trendingPlace=place['id'])
        multi_images_data = MultiImagesSerializer(multi_images, many=True).data
        place['multi_images'] = multi_images_data

    return Response(trending_place_data)

@api_view(['GET'])
def trending_place_detail(request, pk):
    try:
        place = TrendingPlace.objects.get(pk=pk)
    except TrendingPlace.DoesNotExist:
        return Response(status=404)

    multi_images = MultiImages.objects.filter(trendingPlace=place)
    trending_place_data = TrendingPlaceSerializer(place).data
    multi_images_data = MultiImagesSerializer(multi_images, many=True).data
    trending_place_data['multi_images'] = multi_images_data

    return Response(trending_place_data)


@api_view(['GET'])
def route_list(request):
    routes = Route.objects.all()
    serializer = RouteSerializer(routes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def route_detail(request, pk):
    try:
        route = Route.objects.get(pk=pk)
    except Route.DoesNotExist:
        return Response(status=404)

    serializer = RouteSerializer(route)
    return Response(serializer.data)

@api_view(['GET'])
def multi_images_list(request):
    images = MultiImages.objects.all()
    serializer = MultiImagesSerializer(images, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def multi_images_detail(request, pk):
    try:
        image = MultiImages.objects.get(pk=pk)
    except MultiImages.DoesNotExist:
        return Response(status=404)

    serializer = MultiImagesSerializer(image)
    return Response(serializer.data)
