from django.contrib import admin
from .models import Cart, Product, Item

# Register your models here.

admin.site.register(Product)

class ItemInline(admin.StackedInline):
    model = Item

class AdminCart(admin.ModelAdmin):
    inlines = (ItemInline,)

admin.site.register(Cart, AdminCart)