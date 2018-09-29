"""
Views for the user model
"""

from rest_framework import viewsets
from django.contrib.auth.models import User
from .serializers import UserSerializer
from .permissions import IsUserAdminOrReadOnly

class UserView(viewsets.ModelViewSet):
    """
    Model view for the user model
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsUserAdminOrReadOnly,)
