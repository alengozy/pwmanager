from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib import messages
from .forms import RegistrationForm
# Create your views here.
import secrets
from rest_framework.viewsets import GenericViewSet, ViewSet
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from .serializers import UserSerializer

from .models import User
# Create your views here.


class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()


