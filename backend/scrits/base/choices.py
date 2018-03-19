# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.utils.translation import ugettext as _

from model_utils import Choices

STATUS = Choices(
    (0, 'draft', _('Draft')),
    (1, 'published', _('Published')),
)
