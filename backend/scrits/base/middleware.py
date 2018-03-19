# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from hashlib import md5

from django.utils.deprecation import MiddlewareMixin


class CustomSecretBallotMiddleware(object):

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.
        request.secretballot_token = self.generate_token(request)

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    def generate_token(self, request):
        if request.user.is_authenticated():
            return request.user.username
        else:
            try:
                s = ''.join((request.META['REMOTE_ADDR'], request.META['HTTP_USER_AGENT']))
                return md5(s.encode('utf-8')).hexdigest()
            except KeyError:
                return None
