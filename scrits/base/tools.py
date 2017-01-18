# -*- coding: utf-8 -*-
from slugify import slugify


def custom_slugify(value):
    return slugify(value).decode('ascii')
