"""
Serializers for the user model
"""

from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    """
    Custom model for the user model
    """
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(min_length=8, write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class UserTokenSerializer(TokenObtainPairSerializer):
    """
    Determine what is returned in the JWT
    """
    @classmethod
    def get_token(cls, user):
        token = super(UserTokenSerializer, cls).get_token(user)

        # Add custom claims
        token['is_staff'] = user.is_staff
        token['username'] = user.username

        return token
