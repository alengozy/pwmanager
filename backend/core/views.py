# Create your views here.
from rest_framework.generics import GenericAPIView
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer

from .models import CustomUser
# Create your views here.

class HomeView(GenericAPIView):
     permission_classes = (IsAuthenticated,)

     def get(self,request):
          content = {'message': 'Welcome to the Password Manager Home.'}
          return Response(content)
     
     
class LogoutView(GenericAPIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
