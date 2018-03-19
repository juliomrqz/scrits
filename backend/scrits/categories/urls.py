# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from .views import CategoryDetailView

urlpatterns = [
    url(
        regex=r"^(?P<slug>[-\w]+)/$",
        view=CategoryDetailView.as_view(),
        name="detail"
    )
]
