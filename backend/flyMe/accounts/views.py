from django.shortcuts import render, redirect, HttpResponse 
from django.views.generic import DetailView, DeleteView, UpdateView
from accounts.models import MyUser
from accounts.forms import  Registeration, CustomPasswordChangeForm 
from django.views import View
from django.contrib import messages
import re
from django.contrib.auth import authenticate, login, logout

# Register view
class Register(View):
    template_name = 'accounts/registration.html'
    def get(self, request):
        
        if request.user.username:
            print( request.user)
            # return redirect('homepage.index')
            return HttpResponse('welcome to home page, logout first to create new account')

        form = Registeration()
        return render(request, self.template_name, {'form': form})
    
    def post(self, request):
        form = Registeration(request.POST)
        if form.is_valid():
            # check if user add image 
            if 'image' in request.FILES:
                form = Registeration(request.POST, request.FILES)

            user = form.save()
            print(user)
            
            # send_activation_email(user, request)
            # messages.add_message(request, messages.SUCCESS, 'Registration successful. We sent you an email to verify your account')
            return redirect('login')
        return render(request, self.template_name, {'form': form})
    
#-----------------------------------------------------------------------------------------
# login
def login_user(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        # use this if if you need user login only with Email, let it comminted to login with Username or Email

        # if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
        #     messages.error(request, 'Email Is Not Vaild')
        #     return redirect('login')
        
        user = authenticate(request, username=email, password=password)
        
        # if user and not user.is_email_verified:
        #     messages.error(request, 'Email is not verified, please check your email inbox')
        #     return redirect('login')

        if not user:
            messages.error(request, 'Invalid credentials, try again')
            return redirect('login')
        
        login(request, user)
        return redirect('profile.view')

    if request.user.username:
        return redirect('profile.view')
    
    return render(request, 'registration/login.html')

#-----------------------------------------------------------------------------------------
# logout
def logout_user(request):
    logout(request)
    messages.add_message(request, messages.SUCCESS,
                         'Successfully logged out')
    return redirect('login')

#-----------------------------------------------------------------------------------------
# profile view
class Profile(DetailView):
    model = MyUser
    template_name = 'accounts/profile.html'
    def get_object(self, queryset=None):
        return self.request.user #return the currently logged-in user.
    