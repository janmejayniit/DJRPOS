# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from .models import Orders
from .utils import send_sms

'''Email Notification'''
# This signal sends an email to the buyer when a new order is created.
@receiver(post_save, sender=Orders)
def send_order_confirmation_email(sender, instance, created, **kwargs):
    if created:
        send_mail(
            subject='Order Confirmation',
            message=f"Thank you {instance.buyer.first_name} {instance.buyer.last_name}, your order for {instance.order_id} has been received.",
            from_email='janmejay.py@yahoo.com',
            recipient_list=[instance.buyer.email],
            fail_silently=False,
        )

'''SMS Notification (Optional)'''
# Uncomment the following lines if you want to send SMS notifications as well.
# @receiver(post_save, sender=Orders)
# def notify_order_via_sms(sender, instance, created, **kwargs):
#     if created:
#         message = f"Hi {instance.buyer.first_name}, your order for {instance.order_id} was received."
#         send_sms(to_number=instance.buyer.phone, message=message)
