from django.contrib import admin
from .models import Category, Product

# Register your models here.
admin.site.register(Category)

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'stock', 'created_at', 'updated_at')
    search_fields = ('name', 'category__name')
    list_filter = ('category',)
    ordering = ('-created_at',)

admin.site.register(Product, ProductAdmin)