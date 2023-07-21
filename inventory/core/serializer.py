

from .models import Category, Product, Order
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name']
        
class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.category_name')
    class Meta:
        model = Product
        fields = ['id', 'category', 'product_name','sell_price','stock_left','image','measuring_unit']
        
class OrderSerializer(serializers.Serializer):
    product = serializers.IntegerField()
    quantity = serializers.IntegerField()
    