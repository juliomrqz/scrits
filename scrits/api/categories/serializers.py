# -*- coding: utf-8 -*-
from __future__ import absolute_import

from rest_framework import serializers

from ...categories.models import Category
from ..base.serializers import AuthorSerializer


class CategorySerializer(serializers.ModelSerializer):
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Category
        fields = (
            'id',
            'created',
            'modified',
            'author',
            'title',
            'slug',
            'description'
        )
        read_only_fields = ('created', 'modified')
