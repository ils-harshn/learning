from django.urls import path
from . import viewsets

urlpatterns = [
    path('get/', viewsets.ProductView.as_view()),
    path('cart/', view=viewsets.CartView.as_view()),
]