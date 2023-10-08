from rest_framework import serializers
from .models import SecretPassword
from drf_spectacular.utils import extend_schema_field

class SecretPasswordSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=100)
    @extend_schema_field({'type': 'string', 'format': 'password'})
    def get_encrypted_field(self, instance):
        return instance.key
    
    class Meta:
        model = SecretPassword
        fields = ["id", "key"]


    def create(self, validated_data):
        user = validated_data['user']
        key = validated_data['key']


        return SecretPassword.objects.create(key=key, user=user)