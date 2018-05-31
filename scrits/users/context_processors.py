# Django Libraries
from django.conf import settings
from django.urls import reverse


def demo(request):
    return {
        'demo': settings.DEMO
    }
