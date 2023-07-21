
from django.urls import path,include
from .views import CategoryList, ProductList,OrderBulkCreateAPIView
urlpatterns = [
    path('categories/', CategoryList.as_view()),
    path('products/', ProductList.as_view()),
    path('order/', OrderBulkCreateAPIView.as_view()),
    
]