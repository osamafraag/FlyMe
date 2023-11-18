from django.db import models
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required.')
        if not username:
            raise ValueError('A username is required.')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        # Ensure the username field is set to None to avoid the 'unexpected keyword argument' error
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, username, password, **extra_fields)

class MyUser(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('N', 'Prefer not to say'),
    ]
    
    passport_number = models.CharField(max_length=20)
    passport_expire_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=20)
    image = models.ImageField(upload_to='accounts/', blank=True, null=True)
    is_email_verified = models.BooleanField(default=False)
    activation_link_created_at = models.DateTimeField(null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    country = models.ForeignKey('cities_light.Country', on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    city = models.ForeignKey('cities_light.City', on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    region = models.ForeignKey('cities_light.Region', on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    post_code = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = AppUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email



    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    @classmethod
    def get_all_users(cls):
        return cls.objects.all()
class PaymentCard(models.Model):
    TYPES = [
        ('VISA', 'Visa'),
        ('MASTER', 'Master Card'),
        ('MEZA', 'Meza')
    ]
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    type = models.CharField(choices=TYPES)
    cardholder_name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    CVV = models.CharField(max_length=4)

class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('DEPOSIT', 'Deposit'),
        ('WITHDRAWAL', 'Withdrawal'),
        ('WPURCHASE', 'Wallet Purchase'),
        ('CPURCHASE', 'Card Purchase'),
    ]

    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    amount = models.PositiveBigIntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)

    def save(self, *args, **kwargs):
        if self.type == 'WPURCHASE':
            if self.amount <=  0 : 
                raise ValidationError({'totalCost':'amount must be greater than Zero'})
            if self.user.wallet.available_balance < self.amount:
                raise ValidationError({'totalCost':'amount is bigger than your balance'})
            self.user.wallet.available_balance -= self.amount
            self.user.wallet.save()
        elif self.type == 'WITHDRAWAL':
            if self.amount <=  0 : 
                raise ValidationError({'totalCost':'amount must be greater than Zero'})
            if self.user.wallet.available_balance < self.amount:
                raise ValidationError({'totalCost':'amount is bigger than your balance'})
            self.user.wallet.available_balance -= self.amount
            self.user.wallet.withdrawal += self.amount
            self.user.wallet.save()
        elif self.type == 'DEPOSIT':
            self.user.wallet.available_balance += self.amount
            self.user.wallet.save()
        super().save(*args, **kwargs)



class Wallet(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE,related_name='wallet')
    available_balance = models.FloatField(null=True, blank=True,default=0)
    pendding_balance = models.FloatField(null=True, blank=True,default=0)
    withdrawal = models.FloatField(null=True, blank=True,default=0)

    def clean(self) :
        pass
        
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class Complaint(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),  
        ('RESOLVED', 'Resolved'), 
        ('CLOSED', 'Closed'),  
        ('REOPENED', 'Reopened'),  
    ]
    user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE,null=True)
    description = models.TextField()
    answer = models.TextField(blank=True)
    status = models.CharField(choices=STATUS_CHOICES)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Notification(models.Model):
    statuses = [
        ('READ', 'Read'),
        ('UNREAD', 'Unread')
    ]
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE,related_name='notifications')
    title = models.CharField()
    description = models.CharField()
    date = models.DateTimeField(auto_now_add=True)
    readDate = models.DateTimeField(auto_now=True)
    status = models.CharField(choices=statuses, default='UNREAD')

    def clean(self) :
        if self.status == 'UNREAD':
            self.readDate = None
    
    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)
