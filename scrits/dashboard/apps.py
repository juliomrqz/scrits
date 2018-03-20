from django.apps import AppConfig


class DashboardConfig(AppConfig):
    name = 'scrits.dashboard'
    verbose_name = "Dashboard"

    def ready(self):
        """Override this to put in:
            Dashboard system checks
            Dashboard signal registration
        """
        pass
