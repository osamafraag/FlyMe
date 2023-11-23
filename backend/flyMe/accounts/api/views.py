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
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework.generics import UpdateAPIView
from django.utils import timezone
from accounts.api.utils import send_random_code
from django.contrib.auth.hashers import check_password



####################################---------  admin panel / view all user data  -------------###################################
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    users = MyUser.get_all_users()
    serlized_users = []
    for user in users:
        serlized_users.append(UserSerializer(user).data)
    return Response({"data":serlized_users, "massage":"data receved"},status=200)




####################################---------  register  -------------###################################

@method_decorator(csrf_exempt, name='dispatch')
@permission_classes([AllowAny])
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
            if user.is_email_verified or user.is_superuser:
                login(request, user)
                token, _ = Token.objects.get_or_create(user=user)
                return Response({"sucess":"welcome to flyme page",'token': token.key}, status=status.HTTP_200_OK)
            return Response({'error': 'Email is not activated',"email":user.email}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
            



####################################---------  logout  -------------###################################
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_logout(request):
    if request.method == 'POST':
        request.user.auth_token.delete()
        logout(request)
        return Response('User Logged out successfully')    




####################################---------  delete user  (owner and admins) -------------###################################
@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
def delete_user(request, id):
    
    user = MyUser.objects.filter(id=id).first()
    print(user.id)
    start = False

    if not user:
        return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    serialized_user = UserSerializer(user)

    if request.user.is_superuser:
        start = True

    if (not request.user.is_superuser) and (request.user.id == id):
        
        password_to_check = request.query_params.get('password')  
        is_password_true = check_password(password_to_check, user.password)
        if not is_password_true:
            return Response({'error': 'wrong password'}, status=status.HTTP_400_BAD_REQUEST)
        start = True
        
    if request.method == 'DELETE' and start:
        user.delete()
        return Response({'detail': 'User deleted successfully'}, status=status.HTTP_200_OK)
    
    if request.method == 'GET' and start:
        return Response({'detail': serialized_user.data}, status=status.HTTP_200_OK)
    
    if request.method == 'PUT' and start:
        user_serializer = UserSerializer(instance=user, data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response({'detail': 'Your data edited', 'data': user_serializer.data}, status=status.HTTP_200_OK)
        return Response({'error': user_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'error': 'You don\'t have permission'}, status=status.HTTP_200_OK)

####################################---------   get user data  -------------###################################
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_data_view(request):
    user = request.user
    user_serializer =  UserSerializer(user).data
    return Response({"user": user_serializer}, status=status.HTTP_200_OK)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def paymentCardList(request):
    if request.method == 'POST':
        request.data['user'] = request.user.id
        paymentCard = PaymentCardSerializer(data=request.data)
        if paymentCard.is_valid():
            paymentCard.save()
            return Response({"messsage": 'paymentCard add Successfully', "paymentCard":paymentCard.data}, status=201)
        return Response({'errors':paymentCard.errors}, status=400)

    elif request.method=='GET':
        paymentCards = PaymentCard.objects.all()
        serializer = PaymentCardSerializer(paymentCards, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userPaymentCards(request):
    paymentCards = PaymentCard.objects.filter(user=request.user)
    serializer = PaymentCardSerializer(paymentCards, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def transactionsList(request):
    if request.method == 'POST':
        request.data['user'] = request.user.id
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
@permission_classes([IsAuthenticated])
def userTransactions(request):
    transactions = Transaction.objects.filter(user=request.user)
    serializer = TransactionSerializer(transactions, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated,IsAdminUser])
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
@permission_classes([IsAuthenticated])
def userNotifications(request,id):
    notifications = Notification.objects.filter(user=id)
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userWallet(request):
    wallet = Wallet.objects.get(user=request.user)
    serializedWallet = WalletSerializer(wallet)
    return Response({'data':serializedWallet.data}, status=200)
    
@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated])
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
        print('test')
        complaints = Complaint.objects.all()
        serializer = ComplaintSerializer(complaints, many=True)
        return Response(serializer.data)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userComplaints(request,id):
    complaints = Complaint.objects.filter(user_id=id)
    serializer = ComplaintSerializer(complaints, many=True)
    return Response(serializer.data)

@api_view(['GET', 'DELETE', 'PUT'])
@permission_classes([IsAuthenticated,IsAdminUser])
def complaintDetail(request, id):
    complaint = Complaint.objects.get(id=id)
    if request.method=='GET':
        serializedComplaint = ComplaintSerializer(complaint)
        return Response({'data':serializedComplaint.data}, status=200)
    # 'Access-Control-Allow-Origin':'http://localhost:3000'},

    elif request.method=='DELETE':
        complaint.delete()
        return Response({"message":"complaint deleted successfully"}, status= 204)

    elif request.method=="PUT":
        serializedComplaint = ComplaintSerializer(instance=complaint,data=request.data)
        if serializedComplaint.is_valid():
            serializedComplaint.save()
            return Response({"messsage": 'complaint updated successfully', "complaint": serializedComplaint.data}, status=201)
        return Response({"errors":serializedComplaint.errors}, status=400)

# @receiver(post_save, sender=MyUser)
# def create_password_reset_token(sender, instance, created, **kwargs):
#     if created:
#         token = secrets.token_urlsafe(32)
#         PasswordResetToken.objects.create(user=instance, token=token)    

# class RequestPasswordReset(APIView):
#     def post(self, request):
#         email = request.data.get('email')
#         user = MyUser.objects.filter(email=email).first()

#         if user:
#             token = secrets.token_urlsafe(32)
#             reset_token = PasswordResetToken.objects.create(user=user, token=token)
            

#             # Send an email with a link containing the token
#             reset_link = f"{settings.URL}{reverse('complete-password-reset', kwargs={'token': token})}"
#             send_mail(
#                 'Password Reset',
#                 f'Click the following link to reset your password: {reset_link}',
#                 settings.EMAIL_FROM_USER,
#                 [user.email],
#                 fail_silently=False,
#             )

#             return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)
#         else:
#             return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
# class CompletePasswordReset(UpdateAPIView):
#     serializer_class = PasswordResetTokenSerializer
#     def update(self, request, token, *args, **kwargs):
#         print(token)
#         reset_token = PasswordResetToken.objects.filter(token=token).first()
#         print(reset_token)
#         if not reset_token:
#             return Response({'message': 'Invalid or expired token.'}, status=status.HTTP_400_BAD_REQUEST)
#         # Set a new password for the user
#         new_password = request.data.get('new_password')
#         reset_token.user.set_password(new_password)
#         reset_token.user.save()
#         reset_token.delete()
#         return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)


class RequestPasswordReset(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(MyUser, email=email)
        if user:
            emailHeader = 'Password Reset Verification Code'
            user.email_verification_code = send_random_code(user,emailHeader)
            user.save()
            return Response({'message': 'Verification code sent successfully.'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        
class CompletePasswordReset(UpdateAPIView):
    serializer_class = PasswordResetSerializer
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        verification_code = serializer.validated_data['verification_code']
        user = get_object_or_404(MyUser, email=email, email_verification_code=verification_code)
        user.set_password(serializer.validated_data['new_password'])
        user.email_verification_code = None
        user.save()
        return Response({'message': 'Password reset successful.'}, status=status.HTTP_200_OK)
    

class CheckVerificationCode(APIView):
    serializer_class = CheckVerificationCodeSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        verification_code = serializer.validated_data['verification_code']
        user = get_object_or_404(MyUser, email=email, email_verification_code=verification_code)
        return Response({'message': 'true'}, status=status.HTTP_200_OK)
    


class SendActivateEmail(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = get_object_or_404(MyUser, email=email)
        if user:
            emailHeader = 'Activate Email Verification Code'
            user.activation_code = send_random_code(user,emailHeader)
            user.activation_link_created_at = timezone.now()
            user.save()
            return Response({'message': 'Activation code sent successfully.'}, status=status.HTTP_200_OK)
        return Response({'message': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
    


class ActivateAccount(UpdateAPIView):
    serializer_class = CheckVerificationCodeSerializer
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        verification_code = serializer.validated_data['verification_code']
        print(email)
        print(verification_code)
        user = get_object_or_404(MyUser, email=email, activation_code=verification_code)
        user.activation_code = None
        user.is_email_verified = True
        user.save()
        return Response({'message': 'Account activated.'}, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request, id):
    user = get_object_or_404(MyUser, id=id)

    current_password = request.data.get('current_password')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    if not request.user.is_superuser:
        if not check_password(current_password, user.password):
            return Response({'error': 'Current password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
    
    if password == password2:
        user.set_password(password)
        user.save()
        return Response({'message': 'Password changed successfully.'}, status=status.HTTP_200_OK)

    return Response({'error': 'New password and confirm new password do not match.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def check_user_name(request):
    username = request.data.get('username')
    check_username = MyUser.objects.filter(username=username).first()
    
    if check_username:
        return Response({'error': 'Username already exsist.'}, status=status.HTTP_400_BAD_REQUEST) 
    return Response({'message': 'ok'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def check_email(request):
    email = request.data.get('email')
    check_email = MyUser.objects.filter(email=email).first()
    
    if check_email:
        return Response({'error': 'Email already exsist.'}, status=status.HTTP_400_BAD_REQUEST) 
    return Response({'message': 'ok'}, status=status.HTTP_200_OK)