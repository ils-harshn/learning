from django.db import models
from accounts.models import User


class Cart(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)

class Product(models.Model):
    title = models.CharField(max_length=255)
    quantity = models.IntegerField(default=1)

class Item(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(default=1)