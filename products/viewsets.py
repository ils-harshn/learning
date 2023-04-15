from . import models
from . import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist


class ProductView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        products = models.Product.objects.all()
        serializer = serializers.Productserializer(products, many=True)
        return Response(serializer.data)

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

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        if hasattr(request.user, "cart") == False:
            request.user.cart = models.Cart()
            # check for error
            request.user.cart.save()
        return Response(
            serializers.ItemSerializer(request.user.cart.item_set.all(), many=True).data,
            status=status.HTTP_200_OK,
        )

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
            item = models.Item(product=product, quantity=quantity, cart_id=request.user.cart.id)
            item.save()
            return Response(
                serializers.ItemSerializer(
                    request.user.cart.item_set.all(), many=True).data,
                status=status.HTTP_200_OK,
            )
