from django.contrib import admin
from .models import Orders, OrderItem, Buyer

# Register your models here.
class BuyerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'phone', 'address', 'created_at')
    search_fields = ( 'email','phone')
    list_filter = ('created_at',)

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'cashier', 'buyer', 'total_price', 'payment_method', 'discount', 'created_at', 'updated_at')
    search_fields = ('cashier__username', 'buyer__first_name', 'buyer__last_name')
    list_filter = ('payment_method', 'created_at')
    inlines = [OrderItemInline]

admin.site.register(Orders, OrderAdmin)
admin.site.register(OrderItem)  
admin.site.register(Buyer, BuyerAdmin)