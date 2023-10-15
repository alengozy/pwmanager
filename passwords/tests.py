from django.urls import reverse
from rest_framework.test import APIClient, APITestCase
from rest_framework import status
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticatedUserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(username='testuser', password='testpassword')
        self.token = str(RefreshToken.for_user(self.user).access_token)

    def test_authenticated_user_can_create_password(self):
        # Authenticate the user by setting the token in the Authorization header.
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        data={
            "name": "Test password",
            "key": "testkey",
            "account": "testaccount@test.com"
        }
        response = self.client.post(reverse('password-list'), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_unauthenticated_user_cannot_create_password(self):
        # Authenticate the user by setting the token in the Authorization header.
        data={
            "name": "Test password",
            "key": "testkey",
            "account": "testaccount@test.com"
        }
        response = self.client.post(reverse('password-list'), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_authenticated_user_can_list_passwords(self):
        # Authenticate the user by setting the token in the Authorization header.
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.get(reverse('password-list'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_unauthenticated_user_cannot_list_passwords(self):
        # Authenticate the user by setting the token in the Authorization header.
        response = self.client.get(reverse('password-list'))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

