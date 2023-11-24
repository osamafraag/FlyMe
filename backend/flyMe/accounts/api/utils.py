import random
from django.core.mail import send_mail
from rest_framework.permissions import BasePermission
from accounts.models import MyUser
from django.contrib.auth.hashers import check_password





def send_random_code(user, emailHeader):
    verification_code = str(random.randint(100000, 999999))
    send_mail(
        f'{emailHeader}',
        f'Your verification code is: {verification_code}',
        '{email}',
        [user.email],
        fail_silently=False,
    )
    return verification_code


class IsPasswordCorrect(BasePermission):
    def has_permission(self, request, view):
        username = request.data.get('username')
        password_to_check = request.data.get('password')
        try:
            user = MyUser.objects.get(username=username)
        except MyUser.DoesNotExist:
            return False  
        return check_password(password_to_check, user.password)
