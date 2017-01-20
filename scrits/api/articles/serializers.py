# -*- coding: utf-8 -*-
from __future__ import absolute_import

from rest_framework import serializers
from taggit_serializer.serializers import (
    TaggitSerializer,
    TagListSerializerField
)

from ...articles.models import Article
from ...categories.models import Category
from ..base.serializers import AuthorSerializer


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'created',
            'modified',
            'title',
            'slug',
            'description'
        )
        read_only_fields = ('created', 'modified')


class ArticleDetailSerializer(TaggitSerializer, serializers.ModelSerializer):
    tags = TagListSerializerField(required=False)
    category = CategorySerializer()
    author = AuthorSerializer(read_only=True)

    class Meta:
        model = Article
        fields = (
            'id',
            'created',
            'modified',
            'author',
            'title',
            'slug',
            'content',
            'description',
            'category',
            'status',
            'tags'
        )
        read_only_fields = ('created', 'modified')


class ArticleCreateSerializer(ArticleDetailSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        read_only=False)
