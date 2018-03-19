# -*- coding: utf-8 -*-
from __future__ import absolute_import

from django.contrib.auth import get_user_model

from rest_auth.serializers import UserDetailsSerializer

# Get the UserModel
UserModel = get_user_model()


class CustomUserDetailsSerializer(UserDetailsSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = UserModel
        fields = ('username', 'email', 'first_name', 'last_name')
        read_only_fields = ('email', )
