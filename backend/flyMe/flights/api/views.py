from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from flights.models import *
from flights.api.serializers import *
from accounts.models import *
from datetime import datetime
from cities_light.models import City
from rest_framework.permissions import IsAuthenticated , IsAdminUser


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
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
@permission_classes([IsAuthenticated,IsAdminUser])
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
    
@api_view(['GET'])
def flightList(request):
    allFlights = Flight.objects.filter(status='A',availableSeats__gt = 0)
    allowedTime=False
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
                flightDateTime = datetime(year=int(year),month=int(month),day=int(day))
                if flightDateTime.date() <  datetime.now().date():
                    return Response({"error":'can`t search for past dates'})
                flights = flights.filter(departureTime__day=day)
                if int(day) == datetime.now().day:
                    year=datetime.now().year
                    month=datetime.now().month
                    day=datetime.now().day
                    hour=datetime.now().hour 
                    minute=datetime.now().minute
                    second=datetime.now().second
                    allowedTime = datetime(year=year,month=month,day=day,hour=hour,minute=minute,second=second)
                if type == 'D':
                    if source :
                        flights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=source)[0]).values('outFlights'))
                    if destination :
                        flights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=destination)[0]).values('inFlights'))
                    if allowedTime:
                        allowedFlights=[]
                        for flight in flights.all():
                            if flight.departureTime.time() > allowedTime.time():
                               allowedFlights.append(flight)
                        return Response(flightSearchSerializer(allowedFlights))
                    return Response(flightSearchSerializer(flights))
                elif type == 'T':
                    if source :
                        sFlights = flights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=source)[0]).values('outFlights'))
                    if destination :
                        dFlights = allFlights.filter(id__in=AirPort.objects.filter(city=City.objects.filter(name=destination)[0]).values('inFlights'))
                    for sFlight in sFlights.all():
                        for dFlight in dFlights.all():
                            if sFlight.arrivalTime.date() == dFlight.departureTime.date() and sFlight.arrivalTime.time() < dFlight.departureTime.time() and sFlight.endAirport.city == dFlight.startAirport.city :
                                if allowedTime:
                                    if sFlight.departureTime.time() > allowedTime.time():
                                        transetFlights.append([flightSearchSerializer(sFlight,many=False),flightSearchSerializer(dFlight,many=False)])
                                else:
                                    transetFlights.append([flightSearchSerializer(sFlight,many=False),flightSearchSerializer(dFlight,many=False)])
                    return Response(transetFlights)  
        return Response(flightSearchSerializer(flights))
    return Response(flightSearchSerializer(allFlights))

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def allFlights(request):
    if request.method == 'POST':
        flight = FlightSerializer(data=request.data)
        if flight.is_valid():
            flight.save()
            return Response({"messsage": 'Flight add Successfully', "flight":flight.data}, status=201)
        return Response({'errors':flight.errors}, status=400)

    elif request.method=='GET':
        flights = Flight.objects.all()
        cancledFlights = [] 
        commingFlights = []
        passedFlights = []
        liveFlights = []
        for flight in flights:
            if flight.status == 'C':
                cancledFlights.append(flight)
            else:
                if flight.departureTime.timestamp() > datetime.now().timestamp():
                    commingFlights.append(flight)
                elif flight.arrivalTime.timestamp() < datetime.now().timestamp():
                    passedFlights.append(flight)
                else:
                    liveFlights.append(flight)
        return Response({'passed':flightSearchSerializer(passedFlights),'live':flightSearchSerializer(liveFlights),
                     'comming':flightSearchSerializer(commingFlights),'cancled':flightSearchSerializer(cancledFlights)})

def flightSearchSerializer(flights,many=True):
    if many:
        serializer = FlightSerializer(flights, many=True).data
        for flight in serializer:
            flightId = flight['id']
            flght = Flight.objects.get(id=flightId)
            flight['from']=flght.startAirport.city.name
            flight['to']=flght.endAirport.city.name
    else:
        serializer = FlightSerializer(flights).data
        flightId = serializer['id']
        flight = Flight.objects.get(id=flightId)
        serializer['from']=flight.startAirport.city.name
        serializer['to']=flight.endAirport.city.name
    return serializer
    

@api_view(['GET'])
def offerFlights(request):
    flights = Flight.objects.filter(status='A',availableSeats__gt = 0)
    offerFlights = [] 
    for flight in flights:
        if flight.departureTime.timestamp() > datetime.now().timestamp() and flight.offerPercentage > 0:
            offerFlights.append(flight)
    offerFlightsSerializer = FlightSerializer(offerFlights, many=True).data
    for flight in offerFlightsSerializer:
        flightId = flight['id']
        flght = Flight.objects.get(id=flightId)
        flight['from']=flght.startAirport.city.name
        flight['to']=flght.endAirport.city.name
    return Response({'data':offerFlightsSerializer}, status=200)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userFlights(request,id):
    books = BookHistory.objects.filter(passenger=id)
    commingFlights = []
    liveFlights = []
    passedFlights = []
    for book in books.all():
        print(book.passenger)
        if book.flight.departureTime.timestamp() > datetime.now().timestamp():
            commingFlights.append(book.flight)
        if book.flight.arrivalTime.timestamp() < datetime.now().timestamp():
            passedFlights.append(book.flight)
        else:
            liveFlights.append(book.flight)
    passedSerializer = FlightSerializer(passedFlights, many=True).data
    for flight in passedSerializer:
        flightId = flight['id']
        flght = Flight.objects.get(id=flightId)
        flight['from']=flght.startAirport.city.name
        flight['to']=flght.endAirport.city.name
    liveSerializer = FlightSerializer(liveFlights, many=True).data
    for flight in liveSerializer:
        flightId = flight['id']
        flght = Flight.objects.get(id=flightId)
        flight['from']=flght.startAirport.city.name
        flight['to']=flght.endAirport.city.name
    commingSerializer = FlightSerializer(commingFlights, many=True).data
    for flight in commingSerializer:
        flightId = flight['id']
        flght = Flight.objects.get(id=flightId)
        flight['from']=flght.startAirport.city.name
        flight['to']=flght.endAirport.city.name
    return Response({'passed':passedSerializer,'live':liveSerializer,'comming':commingSerializer}) 


@api_view(['GET', 'DELETE', 'PUT'])
# @permission_classes([IsAuthenticated,IsAdminUser])
def flightDetail(request, id):
    flight = Flight.get(id)
    if request.method=='GET':
        serializedFlight = FlightSerializer(flight).data
        serializedFlight['from']=flight.startAirport.city.name
        serializedFlight['to']=flight.endAirport.city.name
        return Response({'data':serializedFlight}, status=200)

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
@permission_classes([IsAuthenticated,IsAdminUser])
def classDetail(request, id):
    category = Class.get(id)
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
@permission_classes([IsAuthenticated])
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

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def classBooks(request,id):
    return Response(BookHistorySerializer(BookHistory.objects.filter(category=id), many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def flightBooks(request,id):
    return Response(BookHistorySerializer(BookHistory.objects.filter(flight=id), many=True).data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userBooks(request,id):
    return Response(BookHistorySerializer(BookHistory.objects.filter(passenger=id), many=True).data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
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
    


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated,IsAdminUser])
def flightReviewList(request):
    if request.method == 'POST':
        flightReview = FlightReviewSerializer(data=request.data)
        if flightReview.is_valid():
            flightReview.save()
            return Response({"messsage": 'flightReview add Successfully', "flightReview":flightReview.data}, status=201)
        return Response({'errors':flightReview.errors}, status=400)

    elif request.method=='GET':
        flightReviews = FlightReview.objects.all()
        serializer = FlightReviewSerializer(flightReviews, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
def flightReview(request,id):
    flightReviews = FlightReview.objects.filter(flight=id)
    serializer = FlightReviewSerializer(flightReviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userFlightReview(request,id):
    flightReviews = FlightReview.objects.filter(passenger=id)
    serializer = FlightReviewSerializer(flightReviews, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def flightReviewDetail(request, id):
    flightReview = FlightReview.objects.get(id=id)
    if request.method=='GET':
        serializedFlightReview = FlightReviewSerializer(flightReview)
        return Response({'data':serializedFlightReview.data}, status=200)

    elif request.method=='DELETE':
        flightReview.delete()
        return Response({"message":"flightReview deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedFlightReview = FlightReviewSerializer(instance=flightReview,data=request.data)
        if serializedFlightReview.is_valid():
            serializedFlightReview.save()
            return Response({"messsage": 'flightReview updated successfully', "flightReview": serializedFlightReview.data}, status=201)
        return Response({"errors":serializedFlightReview.errors}, status=400)