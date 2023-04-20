from django.db import models
from accounts.models import User
from django.utils.translation import gettext_lazy as _
from django.utils import timezone


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

class Order(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=500, blank=False)
    pin_code = models.CharField(max_length=6)
    phone = models.CharField(max_length=10)
    ordered_date = models.DateTimeField(_("Ordered Date"), default=timezone.now)



class OrderedItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.OneToOneField(Product, on_delete=models.DO_NOTHING)
    quantity = models.IntegerField(default=1)