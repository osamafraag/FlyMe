from rest_framework import generics
from countries.models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status



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




class CountryListCreateView(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CountryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer



class AirPortListCreateView(generics.ListCreateAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer

class AirPortRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = AirPort.objects.all()
    serializer_class = AirPortSerializer



class TrendingPlaceListCreateView(generics.ListCreateAPIView):
    queryset = TrendingPlace.objects.all()
    serializer_class = TrendingPlaceSerializer

class TrendingPlaceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TrendingPlace.objects.all()
    serializer_class = TrendingPlaceSerializer



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
