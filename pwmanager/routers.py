from rest_framework.routers import DefaultRouter
from auth.routers import register_auth_router

router = DefaultRouter()
register_auth_router(router)
