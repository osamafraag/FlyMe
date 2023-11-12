from django.urls import path
from accounts.api.views import  getAllUsers, delete_user, user_login, user_logout, RegisterView, user_data_view

urlpatterns = [
    path('users/',getAllUsers,name='users.list'),
    path('login/', user_login, name='user-login'),
    path('logout/', user_logout, name='user-logout'),
    path('user-data/', user_data_view, name='user.data'),
    path('delete/<int:id>/',delete_user,name='users.delete'),
    path('register/', RegisterView.as_view(), name='user.register'),
]

