from .viewsets import RegisterViewSet
from rest_framework.routers import DefaultRouter


def register_auth_router(router: DefaultRouter):
    router.register(r'register', RegisterViewSet, basename='register')
