from .viewsets import RegisterViewSet

def register_core_router(router):
    router.register(r'register', RegisterViewSet, basename='register')