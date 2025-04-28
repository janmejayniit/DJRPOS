from rest_framework import serializers
from .models import Orders, OrderItem, Buyer
from productApp.models import Product
from productApp.serializers import ProductSerializer

class BuyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Buyer
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    # product = ProductSerializer(read_only=True)
    # # product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    # class Meta:
    #     model = OrderItem
    #     fields = ['product', 'quantity', 'price']

    product = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(), write_only=True
    )
    product_details = ProductSerializer(source='product', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['product', 'product_details', 'quantity', 'price']


class OrdersSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    buyer = BuyerSerializer()

    class Meta:
        model = Orders
        fields = ['id', 'cashier', 'buyer', 'total_price', 'payment_method', 'discount', 'created_at', 'updated_at', 'items']
    

    def create(self, validated_data):
        buyer_data = validated_data.pop('buyer')
        items_data = validated_data.pop('items')

        # buyer, _ = Buyer.objects.get_or_create(**buyer_data)
        buyer, _ = Buyer.objects.get_or_create(
            email=buyer_data['email'],
            defaults={
                'first_name': buyer_data['first_name'],
                'last_name': buyer_data['last_name'],
                'phone': buyer_data.get('phone', '')
            }
        )
        order = Orders.objects.create(buyer=buyer, **validated_data)

        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order