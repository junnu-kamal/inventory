from django.contrib import admin
from .models import Product,Category,Order
# Register your models here.
class CategoryAdmin(admin.ModelAdmin):
    pass
class ProductAdmin(admin.ModelAdmin):
    list_display = ('product_name','measuring_unit', 'buy_price', 'sell_price', 'stock_left', 'measuring_unit')
    search_fields = ('product_name','stock_left')
    
    
class OrderAdmin(admin.ModelAdmin):
    list_display = ('product','orderId','quantity','price')
    list_filter =  ["product", "orderId"]
    search_fields = ('product', 'orderId')

admin.site.register(Category,CategoryAdmin)
admin.site.register(Product,ProductAdmin)
admin.site.register(Order,OrderAdmin)
