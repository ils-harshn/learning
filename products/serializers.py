from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from . import models

class Productserializer(ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'title', 'quantity', 'price', 'img_url', 'discounted_price', 'discount_percentage', 'rating', 'about_product']

class CartSerializer(ModelSerializer):
    class Meta:
        model = models.Cart

class ItemSerializer(ModelSerializer):
    product = Productserializer(required=True)
    class Meta:
        model = models.Item
        fields = ['id', 'product', 'quantity']

class OrderSerializer(ModelSerializer):
    class Meta:
        model = models.Order
        fields = ['id', 'address', 'pin_code', 'phone', 'ordered_date']