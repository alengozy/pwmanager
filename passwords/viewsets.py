from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin
from .serializers import SecretPasswordSerializer
from .models import SecretPassword


# Create your views here.
class SecretPasswordViewSet(GenericViewSet, CreateModelMixin, RetrieveModelMixin):
    permission_classes = (IsAuthenticated,)
    serializer_class = SecretPasswordSerializer

    def get_queryset(self):
        return SecretPassword.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(user=self.request.user)