
from . import views
from django.urls import path
urlpatterns = [
    path('api/logout/', views.LogoutView.as_view(), name='logout'),
    path('home/', views.HomeView.as_view(), name='home'),
]