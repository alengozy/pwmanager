from django.urls import path
from django.contrib.auth.views import LoginView, LogoutView
from . import views
app_name = 'auth'

urlpatterns = [
    path('register/', views.register_request, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')

]