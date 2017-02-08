# -*- coding: utf-8 -*-
from django.template import Library
from django.utils.safestring import mark_safe

from ..models import Article

from ...base.tools import markdown_to_html

register = Library()


@register.filter
def apply_markdown(text):
    return markdown_to_html(text)


@register.inclusion_tag('inclusion_tags/recent_articles.html')
def recent_articles():
    articles = Article.objects.all().published()
    articles = articles.order_by('-created')

    return {'articles': articles[:5]}
