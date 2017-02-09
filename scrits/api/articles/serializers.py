# -*- coding: utf-8 -*-
from __future__ import absolute_import

# import the logging library
import logging

from hitcount.models import HitCount
from hitcount.views import HitCountMixin
from rest_framework import serializers
from taggit_serializer.serializers import (
    TaggitSerializer,
    TagListSerializerField
)

from ...articles.models import Article
from ...base.tools import markdown_to_html
from ...categories.models import Category
from ..base.serializers import AuthorSerializer

# Get an instance of a logger
logger = logging.getLogger(__name__)


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
    visits = serializers.SerializerMethodField()

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
            'visits',
        )
        read_only_fields = (
            'created',
            'modified',
        )

    def get_content_html(self, obj):
        return markdown_to_html(obj.content)

    def get_visits(self, obj):
        try:
            # Get the related HitCount object for the article object
            hit_count = HitCount.objects.get_for_object(obj)

            # Return the total hits
            return hit_count.hits
        except Exception as e:
            logger.error(e)

            return 0


class ArticleCreateSerializer(ArticleDetailSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        read_only=False)
