# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from rest_framework import routers

from .articles.views import ArticleViewSet
from .categories.views import CategoryViewSet

router = routers.DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'categories', CategoryViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
