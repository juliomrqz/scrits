# -*- coding: utf-8 -*-
from django.utils.encoding import force_text
from django.utils.safestring import mark_safe

from slugify import slugify


def custom_slugify(value):
    return slugify(value).decode('ascii')


def markdown_to_html(text):
    from markdown2 import markdown

    return mark_safe(markdown(force_text(text), safe_mode="escape"))
