"""
Views for the user model
"""

from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, UserTokenSerializer
from .permissions import IsUserAdminOrReadOnly


class UserView(viewsets.ModelViewSet):
    """
    Model view for the user model
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserAdminOrReadOnly,)

class UserTokenView(TokenObtainPairView):
    """
    View for user tokens using custom token serializer
    """
    serializer_class = UserTokenSerializer