from django.db import models
from accounts.models import User


class Cart(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)

class Product(models.Model):
    title = models.CharField(max_length=255)
    cart = models.ManyToManyField(Cart, blank=True)