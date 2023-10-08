from django.db import models
from core.models import CustomUser
from encrypted_model_fields.fields import EncryptedCharField
# Create your models here.
class SecretPassword(models.Model):
    key = EncryptedCharField(max_length=100)
    date_created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)