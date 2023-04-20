from django.contrib import admin
from .models import Cart, Product, Item, Order, OrderedItem

# Register your models here.

admin.site.register(Product)

class ItemInline(admin.StackedInline):
    model = Item

class OrderedItemInline(admin.StackedInline):
    model = OrderedItem

class AdminCart(admin.ModelAdmin):
    inlines = (ItemInline,)


class AdminOrder(admin.ModelAdmin):
    inlines = (OrderedItemInline,)

admin.site.register(Cart, AdminCart)
admin.site.register(Order, AdminOrder)