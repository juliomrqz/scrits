# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django.utils.translation import ugettext as _

from ..base.choices import STATUS
from .models import Vote


class VoteAdmin(admin.ModelAdmin):
    date_hierarchy = 'created_at'
    list_display = (
        'created_at',  'content_object', 'vote', 'token',
    )
    list_filter = ('created_at', 'vote', )
    raw_id_fields = ('content_type', )

    def title(self, instance):
        return instance

admin.site.register(Vote, VoteAdmin)
