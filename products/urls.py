from django.urls import path
from . import viewsets

urlpatterns = [
    path('get/', view=viewsets.ProductView.as_view()),
    path('id/', view=viewsets.GetProductFromId.as_view()),
    path('cart/', view=viewsets.CartView.as_view()),
    path('order/cart/', view=viewsets.PlaceOrderFromCart.as_view()),
]