from django_filters import FilterSet, CharFilter, NumberFilter
from .models import Product


class ProductFilterSet(FilterSet):
    title = CharFilter(field_name='title', lookup_expr='icontains')
    price = NumberFilter(field_name='price', lookup_expr='lte')
    discounted_price = NumberFilter(
        field_name='discounted_price', lookup_expr='lte')
    discount_percentage = NumberFilter(
        field_name='discount_percentage', lookup_expr='lte')
    rating = NumberFilter(field_name='rating', lookup_expr='lte')

    class Meta:
        model = Product
        fields = ['title', 'price', 'discounted_price',
                  'discount_percentage', 'rating']
