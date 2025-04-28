from django.urls import path
from . import views

urlpatterns = [
    path('create/',views.create_order, name='create_order'),
    path('buyers/',views.get_buyers, name='get_buyers'),
    path('order/<int:order_id>',views.get_orders, name='get_orders'),
]
