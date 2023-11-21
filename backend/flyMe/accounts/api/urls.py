from django.urls import path, include
from accounts.api.views import  *

urlpatterns = [
    path('users/',getAllUsers,name='users.list'),
    path('login/', user_login, name='user-login'),
    path('logout/', user_logout, name='user-logout'),
    path('user-data/', user_data_view, name='user.data'),
    path('edit/<int:id>/',delete_user,name='users.delete'),
    path('register/', RegisterView.as_view(), name='user.register'),
    path('wallets/',walletsList,name='wallets.list'),
    path('wallets/<int:id>', walletDetail, name='wallet.detail'),
    path('transactions/', transactionsList, name='transactions.list'),
    path('transactions/<int:id>', transactionDetail, name='transactions.detail'),
    path('user/<int:id>/transactions',userTransactions,name='user.transactions'),
    path('notifications/',notificationsList,name='notifications.list'),
    path('notifications/<int:id>', notificationDetail, name='notification.detail'),
    path('user/<int:id>/notifications', userNotifications, name='user.notifications'),
    path('paymentCards/', paymentCardList, name='paymentCards.list'),
    path('paymentCards/<int:id>',paymentCardDetail,name='paymentCard.detail'),
    path('user/<int:id>/paymentCards',userPaymentCards,name='user.paymentCards'),
    path('complaints/', complaintsList, name='complaint.list'),
    path('complaints/<int:id>',complaintDetail,name='complaint.detail'),
    path('user/<int:id>/complaints',userComplaints,name='user.complaints'),
    path('request-password-reset/', RequestPasswordReset.as_view(), name='request-password-reset'),
    # path('reset-password/<token>/', CompletePasswordReset.as_view(), name='complete-password-reset'),
    path('complete-password-reset/', CompletePasswordReset.as_view(), name='complete-password-reset'),
    path('cheack-verification-code/', CheckVerificationCode.as_view(), name='cheack-verification-code'),
    path('request-activate-code/', SendActivateEmail.as_view(), name='request-activate-code'),
    path('activate-account/', ActivateAccount.as_view(), name='activate-account'),
    path('change-password/<int:id>/', change_password, name='change-password'),
    path('check_user_name/', check_user_name, name='check_user_name'),
    path('check_email/', check_email, name='check_email'),
    
]

