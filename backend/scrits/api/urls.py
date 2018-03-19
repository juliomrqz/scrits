# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from rest_auth.views import PasswordChangeView, UserDetailsView
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

    # all auth rest
    url(r'^user/$', UserDetailsView.as_view(), name='rest_user_details'),
    url(r'^password/change/$', PasswordChangeView.as_view(), name='rest_password_change'),

    # rest_framework auth
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
