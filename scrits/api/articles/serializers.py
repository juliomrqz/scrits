# -*- coding: utf-8 -*-
from __future__ import absolute_import

from rest_framework import serializers
from taggit_serializer.serializers import (
    TaggitSerializer,
    TagListSerializerField
)

from ...articles.models import Article
from ...base.tools import markdown_to_html
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

    total_upvotes = serializers.IntegerField(read_only=True)
    total_downvotes = serializers.IntegerField(read_only=True)
    total_votes = serializers.IntegerField(read_only=True)

    content_html = serializers.SerializerMethodField()

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
            'content_html',
            'description',
            'category',
            'status',
            'tags',
            'total_upvotes',
            'total_downvotes',
            'total_votes',
        )
        read_only_fields = (
            'created',
            'modified',
        )

    def get_content_html(self, obj):
        return markdown_to_html(obj.content)


class ArticleCreateSerializer(ArticleDetailSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        read_only=False)
