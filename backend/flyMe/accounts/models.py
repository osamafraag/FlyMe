from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django_countries.fields import CountryField
from django.contrib.auth import get_user_model



class MyUser(AbstractUser):
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
    address = models.CharField(max_length=200,null=True, blank=True)
    country = CountryField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    post_code = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

    @classmethod
    def get_all_users(cls):
        return cls.objects.all()
    


class Transaction(models.Model):
    TRANSACTION_TYPES = [
        ('DEPOSIT', 'Deposit'),
        ('WITHDRAWAL', 'Withdrawal'),
        ('TRANSFER', 'Transfer'),
        ('PURCHASE', 'Purchase'),
    ]

    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    amount = models.FloatField()
    date = models.DateField()
    type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)



class Wallet(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    available_balance = models.FloatField(null=True, blank=True)
    pendding_balance = models.FloatField(null=True, blank=True)
    withdrawal = models.BooleanField(null=True, blank=True)

class PaymentCard(models.Model):
    user = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    cardholder_name = models.CharField(max_length=100)
    card_number = models.CharField(max_length=16)
    expiration_date = models.DateField()
    CVV = models.CharField(max_length=4)

class Complaint(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),  
        ('RESOLVED', 'Resolved'), 
        ('CLOSED', 'Closed'),  
        ('REOPENED', 'Reopened'),  
    ]
    user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=100)
    description = models.TextField()
    answer = models.TextField(blank=True)
    status = models.CharField(choices=STATUS_CHOICES)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()


class UserReview(models.Model):
    user_id = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    # flight_id = models.ForeignKey(Flight, on_delete=models.CASCADE) # osama add your model here pls (^_^)
    comment = models.TextField()
    rate = models.IntegerField() 