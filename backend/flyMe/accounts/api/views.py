from rest_framework.response import Response
from accounts.models import *
from accounts.api.serializers import *
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
# @permission_classes([IsAuthenticated,IsAdminUser])
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
    permission_classes = [AllowAny]
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
            # 'address': request.user.address,
            'gender': request.user.gender,
            'post_code': request.user.post_code,
            'created_at': request.user.created_at,
            'updated_at': request.user.updated_at,
        } 
        
    print(request.user)    
    return Response(user_data,status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)




####################################---------  edit user data  -------------###################################
@api_view(['GET', 'POST'])
def paymentCardList(request):
    if request.method == 'POST':
        paymentCard = PaymentCard(data=request.data)
        if paymentCard.is_valid():
            paymentCard.save()
            return Response({"messsage": 'paymentCard add Successfully', "paymentCard":paymentCard.data}, status=201)
        return Response({'errors':paymentCard.errors}, status=400)

    elif request.method=='GET':
        paymentCards = PaymentCard.objects.all()
        serializer = PaymentCardSerializer(paymentCards, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def userPaymentCards(request,id):
    paymentCards = PaymentCard.objects.filter(user=id)
    serializer = PaymentCardSerializer(paymentCards, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def paymentCardDetail(request, id):
    paymentCard = PaymentCard.objects.get(id=id)
    if request.method=='GET':
        serializedPaymentCard = PaymentCardSerializer(paymentCard)
        return Response({'data':serializedPaymentCard.data}, status=200)

    elif request.method=='DELETE':
        paymentCard.delete()
        return Response({"message":"paymentCard deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedPaymentCard = PaymentCardSerializer(instance=paymentCard,data=request.data)
        if serializedPaymentCard.is_valid():
            serializedPaymentCard.save()
            return Response({"messsage": 'paymentCard updated successfully', "paymentCard": serializedPaymentCard.data}, status=201)
        return Response({"errors":serializedPaymentCard.errors}, status=400)
    
@api_view(['GET', 'POST'])
def transactionsList(request):
    if request.method == 'POST':
        transaction = TransactionSerializer(data=request.data)
        if transaction.is_valid():
            transaction.save()
            return Response({"messsage": 'transaction add Successfully', "transaction":transaction.data}, status=201)
        return Response({'errors':transaction.errors}, status=400)

    elif request.method=='GET':
        transactions = Transaction.objects.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

@api_view(['GET'])
def userTransactions(request,id):
    transactions = Transaction.objects.filter(user=id)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def transactionDetail(request, id):
    transaction = Transaction.objects.get(id=id)
    if request.method=='GET':
        serializedTransaction = TransactionSerializer(transaction)
        return Response({'data':serializedTransaction.data}, status=200)

    elif request.method=='DELETE':
        transaction.delete()
        return Response({"message":"transaction deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedTransaction = TransactionSerializer(instance=transaction,data=request.data)
        if serializedTransaction.is_valid():
            serializedTransaction.save()
            return Response({"messsage": 'transaction updated successfully', "transaction": serializedTransaction.data}, status=201)
        return Response({"errors":serializedTransaction.errors}, status=400)
    
@api_view(['GET', 'POST'])
def notificationsList(request):
    if request.method == 'POST':
        notification = NotificationSerializer(data=request.data)
        if notification.is_valid():
            notification.save()
            return Response({"messsage": 'notification add Successfully', "notification":notification.data}, status=201)
        return Response({'errors':notification.errors}, status=400)

    elif request.method=='GET':
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
@api_view(['GET'])
def userNotifications(request,id):
    notifications = Notification.objects.filter(user=id)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def notificationDetail(request, id):
    notification = Notification.objects.get(id=id)
    if request.method=='GET':
        serializedNotification = NotificationSerializer(notification)
        return Response({'data':serializedNotification.data}, status=200)

    elif request.method=='DELETE':
        notification.delete()
        return Response({"message":"notification deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedNotification = NotificationSerializer(instance=notification,data=request.data)
        if serializedNotification.is_valid():
            serializedNotification.save()
            return Response({"messsage": 'notification updated successfully', "notification": serializedNotification.data}, status=201)
        return Response({"errors":serializedNotification.errors}, status=400)
    
@api_view(['GET', 'POST'])
def walletsList(request):
    if request.method == 'POST':
        wallet = WalletSerializer(data=request.data)
        if wallet.is_valid():
            wallet.save()
            return Response({"messsage": 'wallet add Successfully', "wallet":wallet.data}, status=201)
        return Response({'errors':wallet.errors}, status=400)

    elif request.method=='GET':
        wallets = Wallet.objects.all()
        serializer = WalletSerializer(wallets, many=True)
        return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
def walletDetail(request, id):
    wallet = Wallet.objects.get(id=id)
    if request.method=='GET':
        serializedWallet = WalletSerializer(wallet)
        return Response({'data':serializedWallet.data}, status=200)

    elif request.method=='DELETE':
        wallet.delete()
        return Response({"message":"wallet deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedWallet = WalletSerializer(instance=wallet,data=request.data)
        if serializedWallet.is_valid():
            serializedWallet.save()
            return Response({"messsage": 'wallet updated successfully', "wallet": serializedWallet.data}, status=201)
        return Response({"errors":serializedWallet.errors}, status=400)
    
@api_view(['GET', 'POST'])
def complaintsList(request):
    if request.method == 'POST':
        complaint = ComplaintSerializer(data=request.data)
        if complaint.is_valid():
            complaint.save()
            return Response({"messsage": 'complaint add Successfully', "complaint":complaint.data}, status=201)
        return Response({'errors':complaint.errors}, status=400)

    elif request.method=='GET':
        complaints = Complaint.objects.all()
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)
@api_view(['GET'])
def userComplaints(request,id):
    complaints = Complaint.objects.filter(user_id=id)
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)
@api_view(['GET', 'DELETE', 'PUT'])
def complaintDetail(request, id):
    complaint = Complaint.objects.get(id=id)
    if request.method=='GET':
        serializedComplaint = ComplaintSerializer(complaint)
        return Response({'data':serializedComplaint.data,'Access-Control-Allow-Origin':'http://localhost:3000'}, status=200)

    elif request.method=='DELETE':
        complaint.delete()
        return Response({"message":"complaint deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedComplaint = ComplaintSerializer(instance=complaint,data=request.data)
        if serializedComplaint.is_valid():
            serializedComplaint.save()
            return Response({"messsage": 'complaint updated successfully', "complaint": serializedComplaint.data}, status=201)
        return Response({"errors":serializedComplaint.errors}, status=400)