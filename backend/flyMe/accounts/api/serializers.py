from rest_framework import serializers
from accounts.models import MyUser

class UserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    first_name = serializers.CharField(max_length=100)
    last_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()    # ... other fields
    username = serializers.CharField(max_length=100)
    passport_number = serializers.CharField(max_length=20, required=False)
    phone = serializers.CharField(max_length=20, required=False)
    is_email_verified = serializers.BooleanField(default=False)
    address = serializers.CharField(max_length=200, required=False)
    gender = serializers.CharField(max_length=1, required=False)
    post_code = serializers.IntegerField(required=False)
    created_at = serializers.DateField(read_only=True)
    updated_at = serializers.DateField(read_only=True)
    passport_expire_date = serializers.DateField(required=False)
    image = serializers.ImageField(required=False)
    activation_link_created_at = serializers.DateTimeField(required=False)
    birth_date = serializers.DateField(required=False)
    # password = serializers.CharField(max_length=128)
    # country = serializers()


