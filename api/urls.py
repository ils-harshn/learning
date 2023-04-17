from django.urls import path, include
from .obtain_access_token import obtain_auth_token
from accounts.viewsets import RegisterView, AuthUser

urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api-token-auth'),
    path('verify/', AuthUser.as_view(), name='auth_user'),
    path('create_user/', RegisterView.as_view(), name='create_user'),
    path('product/', include('products.urls')),
]