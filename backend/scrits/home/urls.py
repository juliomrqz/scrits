# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from .views import HomeView

app_name = 'home'
urlpatterns = [
    url(r'^$', HomeView.as_view(), name="main"),
]
