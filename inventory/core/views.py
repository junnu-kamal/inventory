from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializer import CategorySerializer, ProductSerializer, OrderSerializer

from .models import Category, Product, Order

# Create your views here.
class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    
class ProductList(generics.ListAPIView):
    queryset = Product.objects.all().order_by('category')
    serializer_class = ProductSerializer
    

class OrderBulkCreateAPIView(APIView):    
    def post(self, request, format=None):
            serializer = OrderSerializer(data=request.data, many=True)
            if serializer.is_valid():
                modified_data = []
                last_order = Order.objects.order_by('-id')[0]
                order_id = last_order.orderId + 1
                for row in serializer.validated_data:
                    product = Product.objects.filter(pk = row['product'])[0]
                    modified_data.append({
                        "orderId" : order_id,
                        "product" : product,
                        "price" : product.sell_price * row['quantity'],
                        "quantity" : row['quantity']
                    })
                    if(product.stock_left < row['quantity']):
                        return Response(f"{product.product_name} stock left {product.stock_left} and order quantity is {row['quantity']}  ", status=status.HTTP_400_BAD_REQUEST)
                    product.stock_left = product.stock_left - row['quantity']
                    product.save()
                model_objects = [Order(**data) for data in modified_data]
                Order.objects.bulk_create(model_objects)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)