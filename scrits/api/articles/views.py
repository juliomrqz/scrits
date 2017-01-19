# -*- coding: utf-8 -*-
from rest_framework import viewsets

from ...articles.models import Article
from .serializers import ArticleCreateSerializer, ArticleDetailSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Articles to be viewed or edited.
    """
    queryset = Article.objects.all().order_by('-created')
    queryset = queryset.prefetch_related("author").prefetch_related("category")

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleDetailSerializer
        if self.action == 'retrieve':
            return ArticleDetailSerializer

        return ArticleCreateSerializer

    def perform_create(self, serializer):
        # Assig the authenticated user as an author
        serializer.save(author=self.request.user)
