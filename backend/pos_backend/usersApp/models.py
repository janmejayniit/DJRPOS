from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    ROLES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('cashier', 'Cashier'),
        ('accountant', 'Accountant'),
        ('inventory', 'Inventory'),
        ('security', 'Security'),
        ('cleaner', 'Cleaner'),
        ('delivery', 'Delivery'),
        ('staff', 'Staff'),
    )

    # Add any additional fields you want to the user model
    role = models.CharField(max_length=10, choices=ROLES, default='cashier')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

