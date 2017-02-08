# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.core.exceptions import PermissionDenied
from django.shortcuts import redirect
from django.utils.translation import ugettext as _
from django.views.generic import View

from braces.views import AjaxResponseMixin, JSONResponseMixin, MessageMixin
from hitcount.views import HitCountDetailView

from .models import Article


class ArticleDetailView(HitCountDetailView):
    model = Article
    context_object_name = "article"
    count_hit = True


class ArticleVoteView(MessageMixin, JSONResponseMixin, AjaxResponseMixin, View):
    model = Article
    template_name = "knowledgebase/article_vote.html"
    _success_upvote_message = _("Thanks, glad we could help!")
    _success_downvote_message = _("We're sorry to hear that.")
    _error_message = _("There was a problem completing your request.")

    def get(self, request, *args, **kwargs):
        raise PermissionDenied

    def post(self, request, *args, **kwargs):
        raise PermissionDenied

    def get_ajax(self, request, *args, **kwargs):
        json_dict = {
            'message': _('Bad request.').encode('utf-8')
        }

        return self.render_json_response(json_dict, 400)

    def post_ajax(self, request, *args, **kwargs):

        if self._vote_article(request):
            message = self._get_success_message()
            status = 200
        else:
            message = self._error_message
            status = 500

        json_dict = {
            'message': message
        }

        return self.render_json_response(json_dict, status)

    def put_ajax(self, request, *args, **kwargs):
        return self.get_ajax(request, *args, **kwargs)

    def delete_ajax(self, request, *args, **kwargs):
        raise PermissionDenied

    def _get_success_message(self):
        if self.kwargs['vote'] == 'downvote':
            return self._success_downvote_message

        return self._success_upvote_message

    def _vote_article(self, request, article=None):
        try:
            # Retrieve token
            token = request.secretballot_token
            if request.user.is_authenticated():
                token = request.user.pk

            # Determine user vote
            vote = 1 if self.kwargs['vote'] == 'upvote' else -1

            # Add article vote
            article = Article.objects.get(slug=self.kwargs['slug'])
            article.add_vote(token, vote)

            return True

        except Exception:
            return False
