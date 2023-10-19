from rest_framework.routers import DefaultRouter
from core.routers import register_core_router
from passwords.routers import register_password_router

router = DefaultRouter()
register_core_router(router)
register_password_router(router)