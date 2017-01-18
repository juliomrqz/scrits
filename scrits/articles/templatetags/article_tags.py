# -*- coding: utf-8 -*-
from django.template import Library
from django.utils.safestring import mark_safe

register = Library()


@register.filter
def apply_markdown(text):
    from bleach import clean
    from markdown import markdown

    return mark_safe(clean(markdown(text)))
