from django.urls import path
from accounts.api.views import  *
from . import views

urlpatterns = [
    path('users/',getAllUsers,name='users.list'),
    path('login/', user_login, name='user-login'),
    path('logout/', user_logout, name='user-logout'),
    path('user-data/', user_data_view, name='user.data'),
    path('delete/<int:id>/',delete_user,name='users.delete'),
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
    path('paymentCards/<int:id>/',paymentCardDetail,name='paymentCard.detail'),
    path('user/<int:id>/paymentCards',userPaymentCards,name='user.paymentCards'),
    path('complaints/', complaintsList, name='complaint.list'),
    path('complaints/<int:id>/',complaintDetail,name='complaint.detail'),
    path('user/<int:id>/complaints',userComplaints,name='user.complaints'),
    path('register/tst/', views.UserRegister.as_view(), name='register'),
	path('login/tst/', views.UserLogin.as_view(), name='login'),
	path('logout/tst/', views.UserLogout.as_view(), name='logout'),
	path('user/tst', views.UserView.as_view(), name='user'),
]

