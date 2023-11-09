from rest_framework.response import Response
from rest_framework.decorators import api_view
from flights.models import *
from flights.api.serializers import *
from accounts.models import *
from datetime import datetime
from cities_light.models import City


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
        allFlights = Flight.all()
        transetFlights = []
        source = request.GET.get('from', None)
        destination = request.GET.get('to', None)
        year = request.GET.get('year', None)
        month = request.GET.get('month', None)
        day = request.GET.get("day", None)
        type = request.GET.get("type", None)
        if year :
            flights = allFlights.filter(departureTime__year=year)
            if month :
                flights = flights.filter(departureTime__month=month)
                if day :
                    flights = flights.filter(departureTime__day=day)
                    flightDateTime = datetime(year=int(year),month=int(month),day=int(day))
                    if flightDateTime.timestamp() < datetime.now().timestamp():
                        return Response({"error":'can`t search for past dates'})
                    if type == 'D':
                        if source :
                            flights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=source)[0]).values('outFlights'))
                        if destination :
                            flights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=destination)[0]).values('inFlights'))
                        serializer = FlightSerializer(flights, many=True)
                        return Response(serializer.data)
                    elif type == 'T':
                        if source :
                            sFlights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=source)[0]).values('outFlights'))
                        if destination :
                            dFlights = allFlights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=destination)[0]).values('inFlights'))
                        for sFlight in sFlights.all():
                            for dFlight in dFlights.all():
                                if sFlight.arrivalTime.date() == dFlight.departureTime.date() and sFlight.arrivalTime.time() < dFlight.departureTime.time() and sFlight.endAirport.city == dFlight.startAirport.city :
                                    sSerializer = FlightSerializer(sFlight)
                                    dSerializer = FlightSerializer(dFlight)
                                    transetFlights.append([sSerializer.data,dSerializer.data])
                        return Response(transetFlights)  
                    
            serializer = FlightSerializer(flights, many=True)
            return Response(serializer.data)          
      
        serializer = FlightSerializer(allFlights, many=True)
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
def bookHistoryList(request):
    if request.method == 'POST':
        bookHistory = BookHistorySerializer(data=request.data)
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
    