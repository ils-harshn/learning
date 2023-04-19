from django.db import models
from accounts.models import User


class Cart(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.author.email

class Product(models.Model):
    title = models.CharField(max_length=255)
    quantity = models.IntegerField(default=1)
    price = models.FloatField(blank=False)
    discounted_price = models.FloatField(blank=False)
    discount_percentage = models.FloatField(blank=False)
    rating = models.FloatField(blank=False)
    about_product = models.TextField(max_length=500)
    img_url = models.URLField(blank=True)

    def __str__(self):
        return self.title

class Item(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(default=1)