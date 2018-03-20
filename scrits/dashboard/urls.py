# -*- coding: utf-8 -*-
from __future__ import absolute_import, unicode_literals

from django.conf.urls import url

from . import views

app_name = 'dashboard'
urlpatterns = [
    url(
        regex=r'^.*$',
        view=views.DashboardView.as_view(),
        name='home'
    )
]
