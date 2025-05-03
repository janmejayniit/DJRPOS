from django.apps import AppConfig


class SalesappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'salesApp'

    def ready(self):
        import salesApp.signals  # Import the signals module to ensure the signal handlers are registered