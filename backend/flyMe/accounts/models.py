from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models
from django_countries.fields import CountryField



class MyUser(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
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

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)