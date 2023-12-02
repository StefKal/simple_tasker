# serializers.py in your app folder
from rest_framework import serializers
from .tasks_serializers import TaskSerializer
from authsystem.models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['uuid', 'email', 'password', 'tasks']
        depth = 1

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.save()
        return user
