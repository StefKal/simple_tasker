from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from authsystem.viewsets import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='users')


urlpatterns = [
    path('auth/token/', jwt_views.TokenObtainPairView.as_view(), name='auth-token'),
    path('auth/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='auth-refresh-token'),
    path('', include(router.urls)),
]
