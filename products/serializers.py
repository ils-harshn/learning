from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer
from . import models

class Productserializer(ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'title', 'quantity']

class CartSerializer(ModelSerializer):
    class Meta:
        model = models.Cart

class ItemSerializer(ModelSerializer):
    product = Productserializer(required=True)
    class Meta:
        model = models.Item
        fields = ['id', 'product', 'quantity']