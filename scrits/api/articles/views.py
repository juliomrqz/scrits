# -*- coding: utf-8 -*-
from rest_framework import filters, viewsets

from ...articles.models import Article
from .serializers import ArticleCreateSerializer, ArticleDetailSerializer


class ArticleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Articles to be viewed or edited.
    """
    queryset = Article.objects.all().order_by('-created')
    queryset = queryset.prefetch_related("author").prefetch_related("category")
    queryset = queryset.prefetch_related('tags')

    filter_backends = (filters.SearchFilter,)
    search_fields = ('title', 'content', 'description', 'category__title')

    def get_serializer_class(self):
        if self.action == 'list':
            return ArticleDetailSerializer
        if self.action == 'retrieve':
            return ArticleDetailSerializer

        return ArticleCreateSerializer

    def perform_create(self, serializer):
        # Assig the authenticated user as an author
        serializer.save(author=self.request.user)
