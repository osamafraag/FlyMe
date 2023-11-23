from rest_framework import serializers
from accounts.models import *
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from cities_light.models import Country


class UserSerializer(serializers.ModelSerializer):
    country_name = serializers.CharField(source='country.name', read_only=True)
    class Meta:
        model = MyUser
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name', 'passport_number',
            'passport_expire_date', 'phone', 'image', 'is_email_verified',
            'activation_link_created_at', 'birth_date',
            'gender', 'post_code', 'created_at', 'updated_at', 'is_superuser', 'country','country_name', 'city', 'region'
        )
        extra_kwargs = {
            'id': {'read_only': True},
            'username': {'read_only': True},
            'is_email_verified':{'read_only': True},
            'created_at':{'read_only': True},
        }

    def update(self, instance, validated_data):
        for field, value in validated_data.items():
            setattr(instance, field, value)
        instance.save()
        return instance


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=MyUser.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    is_superuser = serializers.BooleanField(default=False)  # Default value set to False

    class Meta:
        model = MyUser
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name',
                  'birth_date', 'gender', 'passport_expire_date', 'passport_number', 'phone', 'is_superuser')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'is_superuser': {'default': False}  # Set the default value for is_superuser
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        is_superuser = validated_data.pop('is_superuser', False)  # Pop is_superuser from validated_data with a default value of False

        user = MyUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            birth_date=validated_data['birth_date'],
            gender=validated_data['gender'],
            passport_expire_date=validated_data['passport_expire_date'],
            passport_number=validated_data['passport_number'],
            phone=validated_data['phone'],
        )

        user.set_password(validated_data['password'])
        user.is_superuser = is_superuser  # Set is_superuser based on the provided value
        user.save()
        return user

    
class WalletSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wallet
        fields = '__all__'

        def create(self, validated_data):
            return Wallet.objects.create(**validated_data)

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

        def create(self, validated_data):
            return Transaction.objects.create(**validated_data)
        
class ComplaintSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = '__all__'

        def create(self, validated_data):
            return Complaint.objects.create(**validated_data)

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

        def create(self, validated_data):
            return Notification.objects.create(**validated_data)
        
class PaymentCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentCard
        fields = '__all__'

        def create(self, validated_data):
            return PaymentCard.objects.create(**validated_data)
    

class PasswordResetTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = PasswordResetToken
        fields = ('token',)  


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=6)
    new_password = serializers.CharField(write_only=True)

    def validate_verification_code(self, value):
        return value

class CheckVerificationCodeSerializer(serializers.Serializer):
    email = serializers.EmailField()
    verification_code = serializers.CharField(max_length=6)

    def validate_verification_code(self, value):
        return value    