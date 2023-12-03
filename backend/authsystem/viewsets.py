from drf_spectacular.utils import extend_schema
from rest_framework import viewsets, status
# from rest_framework.exceptions import Throttled
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.db.models import Prefetch


from .models import User, Task
from .permissions import AuthPermissions, TaskPermissions
from .serializers.user_serializers import UserSerializer, TaskSerializer
# from .throttles import CustomAnonThrottle


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    http_method_names = ('post', 'get')
    permission_classes = [AuthPermissions]

    def get_queryset(self):
        # Override get_queryset to return only the request's user object
        user = self.request.user
        prefetch = Prefetch('tasks', queryset=Task.objects.filter(completed=False))
        return User.objects.prefetch_related(prefetch).filter(pk=user.pk)

    # User signup, no authentication required
    @extend_schema(
        request=UserSerializer,
        responses={status.HTTP_201_CREATED: UserSerializer},
        methods=['POST'],
        description='User signup endpoint. No authentication required. Throttled to `1 request` per day per IP.',
        auth=[],
    )
    def create(self, request,
               authentication_classes=(AllowAny, ),
               permission_classes=(AllowAny),
               *args, **kwargs):

        # # Instantiate the custom throttle class
        # throttle = CustomAnonThrottle()

        # # Check if the request is throttled
        # if not throttle.allow_request(request, self):
        #     raise Throttled(status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        #                     detail="Request was throttled, please try again later.")

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @extend_schema(
        request=None,
        responses={status.HTTP_200_OK: TaskSerializer(many=True)},
        methods=['GET'],
        description='User details endpoint.',
    )
    @action(detail=True, methods=['get'])
    def get_tasks(self, request, pk=None):
        user = self.get_object()
        serializer = self.serializer_class(user)
        return Response(serializer.data['tasks'], status=status.HTTP_200_OK)

    @extend_schema(
        request=None,
        responses={status.HTTP_201_CREATED: {"detail": "Tasks populated successfully"}},
        methods=['POST'],
        description='Populate tasks endpoint.',
    )
    @action(detail=True, methods=['post'])
    def populate_tasks(self, request, pk=None):
        user = self.get_object()

        try:
            user.populate_tasks()
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"detail": "Tasks populated successfully"}, status=status.HTTP_201_CREATED)


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    http_method_names = ('get', 'patch')
    permission_classes = [TaskPermissions]

    def get_queryset(self):
        # Override get_queryset to return only the request's user object
        user = self.request.user
        return Task.objects.filter(user=user)
