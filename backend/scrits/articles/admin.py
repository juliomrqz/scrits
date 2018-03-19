# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.utils.translation import ugettext as _

from ..base.choices import STATUS
from .models import Article


class ArticleAdmin(admin.ModelAdmin):
    actions = ('make_published', 'make_draft',)
    date_hierarchy = 'created'
    list_display = (
        'title', 'author', 'status', 'category_title',
    )
    list_filter = ('modified', 'status',)
    prepopulated_fields = {"slug": ("title",)}
    raw_id_fields = ('author', 'category', )
    search_fields = ['title', 'content', 'category__title']

    history_latest_first = True

    def category_title(self, instance):
        return instance.category.title

    def make_published(self, request, queryset):
        rows_updated = queryset.update(status=STATUS.published)

        if rows_updated == 1:
            message_bit = _("1 article was")

        else:
            message_bit = ("%s articles were") % rows_updated

        self.message_user(
            request,
            _("%s successfully marked as published.") % message_bit
        )

    make_published.short_description = _("Mark selected article(s) as published")

    def make_draft(self, request, queryset):
        rows_updated = queryset.update(status=STATUS.draft)

        if rows_updated == 1:
            message_bit = _("1 article was")

        else:
            message_bit = ("%s articles were") % rows_updated

        self.message_user(
            request,
            _("%s successfully marked as draft.") % message_bit
        )

    make_draft.short_description = _("Mark selected article(s) as draft")


admin.site.register(Article, ArticleAdmin)
