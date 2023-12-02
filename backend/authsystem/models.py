import uuid
import requests
from django.db import models
from django.contrib.auth.models import AbstractUser
from authsystem.managers import UserManager


class User(AbstractUser):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    is_active = models.BooleanField(default=False)

    username = None
    email = models.EmailField(unique=True, blank=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    def populate_tasks(self):
        response = requests.get('https://jsonplaceholder.typicode.com/todos')
        todos = response.json()

        for todo in todos:
            Task.objects.create(
                title=todo['title'],
                completed=todo['completed'],
                user=self
            )


class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
