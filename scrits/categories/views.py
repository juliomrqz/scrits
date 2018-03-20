# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import DetailView

from ..articles.models import Article
from .models import Category


class CategoryDetailView(DetailView):
    model = Category
    context_object_name = 'category'

    def get_context_data(self, **kwargs):
        # Call the base implementation first to get a context
        context = super(CategoryDetailView, self).get_context_data(**kwargs)

        # Add in a QuerySet of the Articles
        context['articles_list'] = Article.objects.filter(
            category=self.object
        ).all().published()

        return context
