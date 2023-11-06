from rest_framework.response import Response
from rest_framework.decorators import api_view
from flights.models import *
from flights.api.serializers import *
from accounts.models import *


@api_view(['GET', 'POST'])
def aircraftList(request):
    if request.method == 'POST':
        aircraft = AircraftSerializer(data=request.data)
        if aircraft.is_valid():
            aircraft.save()
            return Response({"messsage": 'Aircraft add Successfully', "aircraft":aircraft.data}, status=201)
        return Response({'errors':aircraft.errors}, status=400)

    elif request.method=='GET':
        aircrafts = Aircraft.all()
        name = request.GET.get('name', None)
        if name is not None:
            aircrafts = aircrafts.filter(name__icontains=name)
        serializer = AircraftSerializer(aircrafts, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def aircraftDetail(request, id):
    aircraft = Aircraft.get(id)
    if request.method=='GET':
        serializedAircraft = AircraftSerializer(aircraft)
        return Response({'data':serializedAircraft.data}, status=200)

    elif request.method=='DELETE':
        aircraft.delete()
        return Response({"message":"aircraft deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedAircraft = AircraftSerializer(instance=aircraft,data=request.data)
        if serializedAircraft.is_valid():
            serializedAircraft.save()
            return Response({"messsage": 'aircraft updated successfully', "aircraft": serializedAircraft.data}, status=201)
        return Response({"errors":serializedAircraft.errors}, status=400)
    
@api_view(['GET', 'POST'])
def flightList(request):
    if request.method == 'POST':
        flight = FlightSerializer(data=request.data)
        if flight.is_valid():
            flight.save()
            return Response({"messsage": 'Flight add Successfully', "flight":flight.data}, status=201)
        return Response({'errors':flight.errors}, status=400)

    elif request.method=='GET':
        flights = Flight.all()
        source = request.GET.get('from', None)
        destination = request.GET.get('to', None)
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        day = request.GET.get("day", None)
        type = request.GET.get("type", None)
        if year :
            flights = flights.filter(departureTime__year=year)
        if month :
            flights = flights.filter(departureTime__month=month)
        if day :
            flights = flights.filter(departureTime__day=day)
        if type :
            flights = flights.filter(type=type)
        if source :
            flights = flights.filter(id__in=Country.objects.filter(name__icontains=source).values('outcomingFlights'))
        if destination :
            flights = flights.filter(id__in=Country.objects.filter(name__icontains=destination).values('incomingFlights'))

        serializer = FlightSerializer(flights, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def flightDetail(request, id):
    flight = Flight.get(id)
    if request.method=='GET':
        serializedFlight = FlightSerializer(flight)
        return Response({'data':serializedFlight.data}, status=200)

    elif request.method=='DELETE':
        flight.delete()
        return Response({"message":"Flight deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedFlight = FlightSerializer(instance=flight,data=request.data)
        if serializedFlight.is_valid():
            serializedFlight.save()
            return Response({"messsage": 'Flight updated successfully', "flight": serializedFlight.data}, status=201)
        return Response({"errors":serializedFlight.errors}, status=400)

@api_view(['GET', 'POST'])
def classList(request):
    if request.method == 'POST':
        category = ClassSerializer(data=request.data)
        if category.is_valid():
            category.save()
            return Response({"messsage": 'Class add Successfully', "class":category.data}, status=201)
        return Response({'errors':category.errors}, status=400)

    elif request.method=='GET':
        classes = Class.all()
        serializer = ClassSerializer(classes, many=True)
        return Response(serializer.data)
    
@api_view(['GET', 'DELETE', 'PUT'])
def classDetail(request, id):
    category = Flight.get(id)
    if request.method=='GET':
        serializedClass = ClassSerializer(category)
        return Response({'data':serializedClass.data}, status=200)

    elif request.method=='DELETE':
        category.delete()
        return Response({"message":"Class deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedClass = ClassSerializer(instance=category,data=request.data)
        if serializedClass.is_valid():
            serializedClass.save()
            return Response({"messsage": 'Class updated successfully', "class": serializedClass.data}, status=201)
        return Response({"errors":serializedClass.errors}, status=400)
    

@api_view(['GET', 'POST'])
def flightRouteList(request):
    if request.method == 'POST':
        flightRoute = FlightRouteSerializer(data=request.data)
        if flightRoute.is_valid():
            flightRoute.save()
            return Response({"messsage": 'flightRoute add Successfully', "flightRoute":flightRoute.data}, status=201)
        return Response({'errors':flightRoute.errors}, status=400)

    elif request.method=='GET':
        flightRoutes = FlightRoute.all()
        serializer = FlightRouteSerializer(flightRoutes, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def flightRouteDetail(request, id):
    flightRoute = FlightRoute.get(id)
    if request.method=='GET':
        serializedFlightRoute = FlightRouteSerializer(flightRoute)
        return Response({'data':serializedFlightRoute.data}, status=200)

    elif request.method=='DELETE':
        flightRoute.delete()
        return Response({"message":"flightRoute deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedFlightRoute = FlightRouteSerializer(instance=flightRoute,data=request.data)
        if serializedFlightRoute.is_valid():
            serializedFlightRoute.save()
            return Response({"messsage": 'flightRoute updated successfully', "flightRoute": serializedFlightRoute.data}, status=201)
        return Response({"errors":serializedFlightRoute.errors}, status=400)


@api_view(['GET', 'POST'])
def bookHistoryList(request):
    if request.method == 'POST':
        bookHistory = BookHistorySerializer(data=request.data)
        if bookHistory.is_valid():
            bookHistory.save()
            book = BookHistory.get(bookHistory.data['id'])
            for flight in book.flights.all() :
                book.totalCost += flight.baseCost
            book.totalCost = book.totalCost + book.totalCost*book.category.additionalCostPercentage/100
            book.cashBack = book.totalCost*0.03
            book.save()
            for flight in book.flights.all():
                flight.destinationCountry.popularity += 1
                flight.destinationCountry.save()
            data = {'bookedAt': request.data['bookedAt'], 'status':  request.data['status'], 'totalCost':  book.totalCost, 'cashBack':  book.cashBack, 'paymentMethod':  request.data['paymentMethod'], 'passenger':  request.data['passenger'], 'category':  request.data['category'], 'flights':  request.data['flights']}
            bookHistory = BookHistorySerializer(data=data)
            if bookHistory.is_valid():
                bookHistory.save()
            return Response({"messsage": 'bookHistory add Successfully', "bookHistory":bookHistory.data}, status=201)
        return Response({'errors':bookHistory.errors}, status=400)

    elif request.method=='GET':
        booksHistory = BookHistory.all()
        serializer = BookHistorySerializer(booksHistory, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def bookHistoryDetail(request, id):
    bookHistory = BookHistory.get(id)
    if request.method=='GET':
        serializedBookHistory = BookHistorySerializer(bookHistory)
        return Response({'data':serializedBookHistory.data}, status=200)

    elif request.method=='DELETE':
        bookHistory.delete()
        return Response({"message":"bookHistory deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedBookHistory = BookHistorySerializer(instance=bookHistory,data=request.data)
        if serializedBookHistory.is_valid():
            serializedBookHistory.save()
            return Response({"messsage": 'bookHistory updated successfully', "bookHistory": serializedBookHistory.data}, status=201)
        return Response({"errors":serializedBookHistory.errors}, status=400)
    