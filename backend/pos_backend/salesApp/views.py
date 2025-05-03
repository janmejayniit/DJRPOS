from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Orders, OrderItem, Buyer
from .serializers import OrdersSerializer, OrderItemSerializer, BuyerSerializer, BuyerWithOrdersSerializer
# Create your views here.

# @api_view(['POST'])
# def create_order(request):
#     buyer_data = request.data.get('buyer')
#     buyer, created = Buyer.objects.get_or_create(**buyer_data)
#     serializer = OrdersSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(buyer=buyer)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_order(request):
    serializer = OrdersSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(cashier=request.user)  # attach the logged-in user
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_orders(request, order_id):
    try:
        order = Orders.objects.get(id=order_id)
    except Orders.DoesNotExist:
        return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
    serializer = OrdersSerializer(order)    
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_buyers(request):
    buyers = Buyer.objects.all()
    serializer = BuyerSerializer(buyers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders_list(request):
    orders = Orders.objects.all().order_by('-created_at')
    serializer = OrdersSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_buyer_orders(request, buyer_id):
    # try:
    #     buyer = Buyer.objects.get(id=buyer_id)
    # except Buyer.DoesNotExist:
    #     return Response({"error": "Buyer not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # orders = Orders.objects.filter(buyer=buyer).order_by('-created_at')
    # serializer = OrdersSerializer(orders, many=True)
    # return Response(serializer.data, status=status.HTTP_200_OK)

    try:
        buyer = Buyer.objects.get(id=buyer_id)
    except Buyer.DoesNotExist:
        return Response({"error": "Buyer not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = BuyerWithOrdersSerializer(buyer)
    return Response(serializer.data, status=status.HTTP_200_OK)