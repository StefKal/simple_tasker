# serializers.py in your app folder
from rest_framework import serializers

from authsystem.models import Task


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'completed')
