from django.urls import path, include
from .router import router
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth', obtain_auth_token, name='api-token-auth'),
]