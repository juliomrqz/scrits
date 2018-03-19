# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models.query import QuerySet


class CategoryQuerySet(QuerySet):

    def by_author(self, user):
        return self.filter(author=user)
