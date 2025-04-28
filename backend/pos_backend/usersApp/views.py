# from django.shortcuts import render
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.response import Response
# from salesApp.models import Sale, SaleItem

# # Create your views here.

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_sale(request):
#     items = request.data.get('items')
#     total = request.data.get('total')

#     sale = Sale.objects.create(user=request.user, total=total)
#     for item in items:
#         SaleItem.objects.create(
#             sale=sale,
#             product_id=item['product_id'],
#             quantity=item['quantity']
#         )

#     return Response({'message': 'Sale recorded.'}, status=201)
