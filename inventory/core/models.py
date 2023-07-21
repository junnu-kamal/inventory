from django.db import models

# Create your models here.
class Category(models.Model):
   category_name  = models.CharField(max_length=100)
   def __str__(self):
      return self.category_name

class Product(models.Model):
    status_choices = [
       ('liters', 'Liters'),
       ('ml', 'ML'),
       ('numbers', 'Number'),
       ('grams', 'grams'),
       ('kgs', 'Kgs'),
    ]
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_name  = models.CharField(max_length = 100)
    buy_price = models.FloatField(default= 0)
    sell_price = models.FloatField(default= 0)
    stock_left = models.IntegerField(default= 0)
    measuring_unit = models.CharField(max_length = 100, choices=status_choices)
    image = models.ImageField(upload_to='uploads/',  null= True, blank = True, height_field=None, width_field=None, max_length=100)

    def __str__(self):
      return self.product_name
  
class Stock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default= 0)
    
class Expense(models.Model):
    choices = [
       ('water', 'Water'),
       ('electricity', 'Electricity'),
       ('packing_covers', 'Packing Covers'),
       ('good_will', 'Good Will'),
       ('salary', 'Salary'),
       ('rent', 'Rent'),
       ('others', 'Others'),
    ]
    measuring_unit = models.CharField(max_length = 100, choices=choices)
    quantity = models.FloatField(default= 0)
    
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    orderId = models.IntegerField(default= 0)
    quantity = models.IntegerField(default= 0)
    price = models.FloatField(default= 0)
    
    def __str__(self):
      return self.product.product_name + " = " + self.selling_price