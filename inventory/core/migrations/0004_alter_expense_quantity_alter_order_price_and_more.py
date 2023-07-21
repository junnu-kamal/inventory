# Generated by Django 4.2.3 on 2023-07-20 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_product_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='expense',
            name='quantity',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='order',
            name='price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='buy_price',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='product',
            name='sell_price',
            field=models.FloatField(default=0),
        ),
    ]