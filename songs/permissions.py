"""
Permissions for songs and binders
"""
from rest_framework import permissions


class IsOwnerPublicOrReadOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Only allow GET request if user or public
        if request.method == "GET":
            return obj.user == request.user or obj.scope == "PU"

        # Write permissions are only allowed to the owner of the snippet.
        return obj.user == request.user
