from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from accounts.models import MyUser
from accounts.api.serializers import UserSerializer
from rest_framework import status

## for admin panel
## to get all users and all they data
@api_view(['GET'])
def getAllUsers(request):
    users = MyUser.get_all_users()
    serlized_users = []
    for user in users:
        serlized_users.append(UserSerializer(user).data)
    print(serlized_users)
    return Response({"data":serlized_users,"massage":"data receved"},status=200)

# add user
@api_view(['POST'])
def addUser(request):
    if request.method == "POST":
        new_user = MyUser.objects.create(**request.data)
        return Response({'message': "User created", 'id': new_user.id}, status=status.HTTP_201_CREATED)
    return Response( status=status.HTTP_400_BAD_REQUEST)
    
# delete user
@api_view(['GET', 'DELETE'])
def deleteUser(request, id):
    try:
        user = MyUser.objects.get(id=id)
    except MyUser.DoesNotExist:
        return Response({'masage':"not found" },status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        user.delete()
        return Response({'masage':"done" }, status=status.HTTP_204_NO_CONTENT)