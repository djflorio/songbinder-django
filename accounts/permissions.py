from rest_framework import permissions


class IsUserAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method == "GET" or request.method == "POST":
            return True

        # Write permissions are only allowed to the owner of the snippet.
        return obj == request.user or request.user.is_staff
