from django.urls import path

from .views import product_list, product_detail, create_product

urlpatterns = [
    path('', product_list, name='product-list'),
    path('<int:pk>/', product_detail, name='product-detail'),
    path('create/', create_product, name='create-product'),
    # path('update/<int:pk>/', update_product, name='update-product'),
    # path('delete/<int:pk>/', delete_product, name='delete-product')
]
