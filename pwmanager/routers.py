from rest_framework.routers import DefaultRouter
from core.routers import register_core_router

router = DefaultRouter()
register_core_router(router)
