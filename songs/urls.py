from django.urls import path
from .views import (
    SongListByUser, SongCreateView, SongView,
    BinderListByUser, BinderCreateView, BinderView,
    BinderActionView
)

urlpatterns = [
    path('songs/user/<int:uId>/', SongListByUser.as_view()),
    path('songs/<int:pk>/', SongView.as_view()),
    path('songs/', SongCreateView.as_view()),
    path('binders/user/<int:uId>/', BinderListByUser.as_view()),
    path('binders/<int:pk>/', BinderView.as_view()),
    path('binders/', BinderCreateView.as_view()),
    path('binders/action/', BinderActionView.as_view()),
]