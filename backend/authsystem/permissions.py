from rest_framework.permissions import BasePermission


class AuthPermissions(BasePermission):
    def has_permission(self, request, view):

        if view.action in ('list', 'retrieve'):
            return request.user.has_perm('authsystem.view_user')
        elif view.action in ('populate_tasks', 'get_tasks'):
            return request.user.has_perm('authsystem.add_task')
        elif view.action == 'create':
            return True
        return False


class TaskPermissions(BasePermission):
    def has_permission(self, request, view):
        if view.action in ('list', 'retrieve'):
            return True
        elif view.action in ('update', 'partial_update'):
            return request.user.has_perm('authsystem.add_task')
        return False
