"""
Permissions for the accounts app
"""

from rest_framework import permissions


class IsUserAdminOrReadOnly(permissions.BasePermission):
    """
    Determine if user is admin, otherwise resource is read-only
    """
    def has_object_permission(self, request, view, obj):
        # Allow anyone to retrieve or create a user
        if request.method == "GET" or request.method == "POST":
            return True

        # For everything else, user must be an admin
        return obj == request.user or request.user.is_staff
