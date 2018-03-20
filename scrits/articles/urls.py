from __future__ import unicode_literals

from django.conf.urls import include, url

from . import views

app_name = 'articles'
urlpatterns = [
    url(
        regex=r"^(?P<slug>[\w-]+)/*$",
        view=views.ArticleDetailView.as_view(),
        name="article_detail"
    ),
    # vote
    url(
        regex=r"^(?P<slug>[\w-]+)/downvote/$",
        view=views.ArticleVoteView.as_view(),
        kwargs={'vote': 'downvote'},
        name="article_downvote"
    ),
    url(
        regex=r"^(?P<slug>[\w-]+)/upvote/$",
        view=views.ArticleVoteView.as_view(),
        kwargs={'vote': 'upvote'},
        name="article_upvote"
    ),
]
