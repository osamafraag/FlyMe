from django.contrib import admin
from accounts.models import *

# Register your models here.

admin.site.register(MyUser)
admin.site.register(Transaction)
admin.site.register(Wallet)
admin.site.register(PaymentCard)
admin.site.register(Complaint)
admin.site.register(Notification)
admin.site.register(PasswordResetToken)
# admin.site.register(Dependent)