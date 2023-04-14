from rest_framework.serializers import ModelSerializer
from . import models

class Productserializer(ModelSerializer):
    class Meta:
        model = models.Product
        fields = ['id', 'title']

class CartSerializer(ModelSerializer):
    class Meta:
        model = models.Cart