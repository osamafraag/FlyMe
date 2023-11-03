from rest_framework.decorators import api_view
from rest_framework.response import Response
from countries.models import Country, AirPort, TrendingPlace, Route, MultiImagesCountry, MultiImagesTrendingPlace
from countries.api.serializers import CountrySerializer, AirPortSerializer, TrendingPlaceSerializer, RouteSerializer, MultiImagesSerializerTrendingPlace,MultiImagesSerializerCountry

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
