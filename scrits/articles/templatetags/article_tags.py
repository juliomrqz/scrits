# -*- coding: utf-8 -*-
from django.template import Library
from django.utils.safestring import mark_safe

from ...base.tools import markdown_to_html

register = Library()


@register.filter
def apply_markdown(text):
    return markdown_to_html(text)
