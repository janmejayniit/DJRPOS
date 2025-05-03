from django.urls import path
from . import views

urlpatterns = [
    path('create/',views.create_order, name='create_order'),
    path('buyers/',views.get_buyers, name='get_buyers'),
    path('order/<int:order_id>',views.get_orders, name='get_orders'),
    path('orders/',views.get_orders_list, name='get_orders_list'),
    path('order/buyer/<int:buyer_id>',views.get_buyer_orders, name='get_buyer_orders')
]
