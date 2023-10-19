from .viewsets import SecretPasswordViewSet

def register_password_router(router):
    router.register(r'password', SecretPasswordViewSet, basename = 'password')