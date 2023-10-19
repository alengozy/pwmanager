from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import CustomUser
from rest_framework_simplejwt.tokens import RefreshToken

class AuthenticationTests(APITestCase):

    def test_user_registration(self):
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post(reverse("register-list"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        user = CustomUser.objects.create_user(username="testuser", password="testpassword")
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post(reverse("token_obtain_pair"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_token_refresh(self):
        user = CustomUser.objects.create_user(username="testuser", password="testpassword")
        data = {
            "username": "testuser",
            "password": "testpassword"
        }
        response = self.client.post(reverse("token_obtain_pair"), data, format="json")
        refresh = response.data["refresh"]
        refresh_token = RefreshToken(refresh)
        data = {
            "refresh": str(refresh_token)
        }
        response = self.client.post(reverse("token_refresh"), data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
