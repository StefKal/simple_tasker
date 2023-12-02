from django.contrib.auth.models import BaseUserManager, Permission


class UserManager(BaseUserManager):
    """ User Model Manager """

    def create_user(self, email, password=None, is_staff=False, is_admin=False, is_active=True):
        if not email:
            raise ValueError('Users must have email Address')
        if not password:
            raise ValueError('User must have Password')
        # if not full_name:
        #     raise ValueError('User must have a full name')
        user_obj = self.model(
            email=self.normalize_email(email),
        )
        user_obj.set_password(password)
        user_obj.is_staff = is_staff
        user_obj.is_admin = is_admin
        user_obj.is_active = is_active
        user_obj.save()

        # Fetch and assign permissions after saving the user
        add_task_perm = Permission.objects.get(codename='add_task')
        view_user_perm = Permission.objects.get(codename='view_user')
        user_obj.user_permissions.set([add_task_perm, view_user_perm])

        return user_obj

    def create_staffuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True
        )
        return user

    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user
