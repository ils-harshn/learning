from django.urls import path, include
# from rest_framework.authtoken.views import obtain_auth_token
from .obtain_access_token import obtain_auth_token

urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
    path('product/', include('products.urls')),
]