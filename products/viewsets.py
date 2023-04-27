from . import models
from . import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.pagination import LimitOffsetPagination
from collections import OrderedDict


class ProductView(APIView, LimitOffsetPagination):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        products = models.Product.objects.all()
        results = self.paginate_queryset(products, request, view=self)
        serializer = serializers.Productserializer(results, many=True)
        return self.get_paginated_response(serializer.data)

    def post(self, request, format=None):
        serializer = serializers.Productserializer(data=request.data)
        if (request.user.has_perm("add_product") == False):
            return Response({
                "error": "Permission Denied",
            }, status=status.HTTP_403_FORBIDDEN)

        if (serializer.is_valid()):
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class GetProductFromId(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            id = int(request.data.get("id"))
        except:
            return Response({
                "error": "Id is not provided",
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            product = models.Product.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({
                "error": "Product Not Found",
            }, status=status.HTTP_404_NOT_FOUND)

        is_in_cart = True
        quantity_added = False
        try:
            item = request.user.cart.item_set.get(product_id=id)
            quantity_added = item.quantity
        except ObjectDoesNotExist:
            is_in_cart = False
        data = {
            "product": serializers.Productserializer(product).data,
            "is_in_cart": is_in_cart,
        }
        if (quantity_added): data["quantity_added"] = quantity_added
        return Response(
            data=data
        )


class CartView(APIView, LimitOffsetPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if hasattr(request.user, "cart") == False:
            request.user.cart = models.Cart()
            # check for error
            request.user.cart.save()

        serializer = serializers.ItemSerializer(request.user.cart.item_set.all(), many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


    def post(self, request, format=None):
        try:
            id = int(request.data.get("id"))
            quantity = int(request.data.get("quantity"))
        except:
            return Response({
                "error": "Invalid data provided",
            }, status=status.HTTP_404_NOT_FOUND)

        if hasattr(request.user, "cart") == False:
            request.user.cart = models.Cart()
            request.user.cart.save()

        try:
            product = models.Product.objects.get(id=id)
        except ObjectDoesNotExist:
            return Response({
                "error": "Product Not Found",
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            request.user.cart.item_set.get(product_id=id)
            return Response({
                "error": "already added this product",
            }, status=status.HTTP_208_ALREADY_REPORTED)
        except ObjectDoesNotExist:
            item = models.Item(
                product=product, quantity=quantity, cart_id=request.user.cart.id)
            item.save()

            results = self.paginate_queryset(
                request.user.cart.item_set.all(), request, view=self)
            serializer = serializers.ItemSerializer(results, many=True)
            return self.get_paginated_response(serializer.data)

    def delete(self, request, format=None):
        try:
            id = int(request.data.get("id"))
        except:
            return Response({
                "error": "Invalid data provided",
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            request.user.cart
        except:
            return Response({
                "error": "Cart not created yet",
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            item = request.user.cart.item_set.get(product_id=id)
            item.delete()
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response({
                "error": "Product Not Found To Delete",
            }, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, format=None):
        try:
            id = int(request.data.get("id"))
            quantity = int(request.data.get("quantity"))
        except:
            return Response({
                "error": "Invalid data provided",
            }, status=status.HTTP_404_NOT_FOUND)

        try:
            item = request.user.cart.item_set.get(product_id=id)
            product = item.product
        except ObjectDoesNotExist:
            return Response({
                "error": "Product Not Found",
            }, status=status.HTTP_404_NOT_FOUND)

        if (quantity > product.quantity):
            return Response({
                "error": "Product out of stock",
            }, status=status.HTTP_208_ALREADY_REPORTED)

        if (quantity < 1):
            return Response({
                "error": "quantity should be greater then 0",
            }, status=status.HTTP_208_ALREADY_REPORTED)

        item.quantity = quantity
        item.save()

        return Response(
            status=status.HTTP_200_OK,
        )


class PlaceOrderFromCart(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        try:
            cart = request.user.cart
            if (cart.item_set.count() == 0):
                raise ObjectDoesNotExist
        except ObjectDoesNotExist:
            return Response({
                "error": "Cart is empty",
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = serializers.OrderSerializer(data=request.data)
        if (serializer.is_valid() == False):
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        order = models.Order(
            author=request.user,
            address=serializer.data["address"],
            pin_code=serializer.data["pin_code"],
            phone=serializer.data["phone"]
        )
        order.save()
        for item in cart.item_set.all():
            models.OrderedItem(order=order, product=item.product,
                               quantity=item.quantity).save()
        request.user.cart.delete()
        return Response(status=status.HTTP_200_OK)
    
class OrderView(APIView, LimitOffsetPagination):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        orders = request.user.order_set.order_by("-ordered_date")
        results = self.paginate_queryset(orders, request, view=self)
        serializer = serializers.OrderSerializer(results, many=True)
        return self.get_paginated_response(serializer.data)

from rest_framework.viewsets import generics
from django_filters.rest_framework import DjangoFilterBackend
from .filters import ProductFilterSet

class ProductFilter(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = models.Product.objects.all()
    serializer_class = serializers.Productserializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilterSet