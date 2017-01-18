# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models.query import QuerySet

from ..base.choices import STATUS


class ArticleQuerySet(QuerySet):

    def by_author(self, user):
        return self.filter(author=user)

    def published(self):
        return self.filter(status=STATUS.published)

    def unpublished(self):
        return self.filter(status=STATUS.draft)
