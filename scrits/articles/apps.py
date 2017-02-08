# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.apps import AppConfig


class ArticlesConfig(AppConfig):
    name = 'scrits.articles'
    verbose_name = 'Articles'

    def ready(self):
        from ..votes.utils import enable_voting_on
        # from secretballot import enable_voting_on

        # importing model classes
        from .models import Article

        # enable voting for articles
        enable_voting_on(Article)
