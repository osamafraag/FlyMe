from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from accounts.models import MyUser
from accounts.api.serializers import UserSerializer, RegisterSerializer
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import permission_classes, api_view
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics
from django.utils.decorators import method_decorator




####################################---------  admin panel / view all user data  -------------###################################
@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def getAllUsers(request):
    users = MyUser.get_all_users()
    serlized_users = []
    for user in users:
        serlized_users.append(UserSerializer(user).data)
    print(serlized_users)
    return Response({"data":serlized_users,"massage":"data receved"},status=200)




####################################---------  register  -------------###################################
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    queryset = MyUser.objects.all()
    permission_classes = AllowAny
    serializer_class = RegisterSerializer
    



####################################---------  login  -------------###################################
@permission_classes([AllowAny])
@api_view(['POST'])
def user_login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user:
            login(request, user)
            token, _ = Token.objects.get_or_create(user=user)
            return Response({"sucess":"welcome to flyme page",'token': token.key}, status=status.HTTP_200_OK)
        
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            



####################################---------  logout  -------------###################################
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_logout(request):

    request.user.auth_token.delete()

    logout(request)

    return Response('User Logged out successfully')    




####################################---------  delete user  (owner and admins) -------------###################################
@csrf_exempt
@api_view(['GET','DELETE','PUT'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):
    try:
        user = MyUser.objects.filter(id=id).first()  
    except MyUser.DoesNotExist:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serialized_user = UserSerializer(user)
    
    if request.method == 'DELETE':
        print(request.user.id)
        print(id)
        print(request.user.is_superuser)
        if request.user.id == id or request.user.is_superuser:
            user.delete()
            return Response({'detail': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'You don\'t have permission, only for admin'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'GET':
        if request.user.id == id or request.user.is_superuser:
            return Response({'detail': serialized_user.data}, status=status.HTTP_204_NO_CONTENT)
        return Response({'error': 'You don\'t have permission, only for admin'}, status=status.HTTP_403_FORBIDDEN)
    
    if request.method == 'PUT':
        user_serializer = UserSerializer(instance=user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'detail': 'your data edited'}, status=status.HTTP_200_OK)
        return Response({'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    # return Response({'error': 'You don\'t have permission'}, status=status.HTTP_403_FORBIDDEN)




####################################---------   get user data  -------------###################################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data_view(request):
    imageURL = None
    user_data ={'user':'AnonymousUser'}  
    if not request.user.is_anonymous :
        if request.user.image:
            imageURL = request.user.image.url
        user_data = {
            'token': request.user.auth_token.key,
            'id': request.user.id,
            'username': request.user.username,
            'email': request.user.email,
            'first_name': request.user.first_name,
            'last_name': request.user.last_name,
            'passport_number': request.user.passport_number,
            'passport_expire_date': request.user.passport_expire_date,
            'phone': request.user.phone,
            'image': imageURL,
            'is_email_verified': request.user.is_email_verified,
            'activation_link_created_at': request.user.activation_link_created_at,
            'birth_date': request.user.birth_date,
            'address': request.user.address,
            'gender': request.user.gender,
            'post_code': request.user.post_code,
            'created_at': request.user.created_at,
            'updated_at': request.user.updated_at,
        } 
        
    print(request.user)    
    return Response(user_data,status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)




####################################---------  edit user data  -------------###################################
