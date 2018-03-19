# -*- coding: utf-8 -*-
from rest_framework import viewsets

from ...categories.models import Category
from .serializers import CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Articles to be viewed or edited.
    """
    queryset = Category.objects.all().order_by('-created')
    queryset = queryset.prefetch_related("author")
    serializer_class = CategorySerializer

    def perform_create(self, serializer):
        # Assig the authenticated user as an author
        serializer.save(author=self.request.user)
