# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.conf import settings
from django.db import models
from django.urls import reverse
from django.utils.encoding import python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _

from model_utils.models import TimeStampedModel
from taggit.managers import TaggableManager

from ..base.choices import STATUS
from ..base.tools import custom_slugify
from ..categories.models import Category
from .querysets import ArticleQuerySet


@python_2_unicode_compatible
class Article(TimeStampedModel):

    title = models.CharField(max_length=200)

    slug = models.SlugField(unique=True)

    content = models.TextField(_('Content'))

    description = models.TextField(
        _('Description'),
        max_length=200,
        blank=True
    )

    category = models.ForeignKey(
        Category, 
        related_name='articles',
        on_delete=models.deletion.CASCADE)

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.deletion.CASCADE)

    status = models.IntegerField(choices=STATUS, default=STATUS.draft)

    tags = TaggableManager(blank=True)

    objects = ArticleQuerySet().as_manager()

    class Meta:
        verbose_name = _('Article')
        verbose_name_plural = _('Articles')

    def save(self, *args, **kwargs):
        # Newly created object, so set slug
        if not self.pk:
            if not self.slug:
                self.slug = custom_slugify(self.title)

        super(Article, self).save(*args, **kwargs)

    def __str__(self):
        return self.title
