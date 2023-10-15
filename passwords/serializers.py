from rest_framework import serializers
from .models import SecretPassword
from drf_spectacular.utils import extend_schema_field

class SecretPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = SecretPassword
        fields = ["id", "name", "key", "account"]


    def create(self, validated_data):
        return SecretPassword.objects.create(name=validated_data['name'],
                                             account=validated_data['account'], 
                                             key=validated_data['key'], 
                                             user=validated_data['user'])