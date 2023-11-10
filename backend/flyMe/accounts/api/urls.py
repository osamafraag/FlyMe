from django.urls import path
from accounts.api.views import  getAllUsers, addUser, deleteUser

urlpatterns = [
    path('users',getAllUsers,name='users.list'),
    path('create',addUser,name='users.create'),
    path('delete/<int:id>',deleteUser,name='users.delete'),
]

