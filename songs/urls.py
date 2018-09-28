from django.urls import path
from .views import (
    SongListByUser, SongCreateView, SongView,
    CollectionListByUser, CollectionCreateView, CollectionView,
    CollectionActionView
)

urlpatterns = [
    path('songs/user/<int:uId>/', SongListByUser.as_view()),
    path('songs/<int:pk>/', SongView.as_view()),
    path('songs/', SongCreateView.as_view()),
    path('collections/user/<int:uId>/', CollectionListByUser.as_view()),
    path('collections/<int:pk>/', CollectionView.as_view()),
    path('collections/', CollectionCreateView.as_view()),
    path('collections/action/', CollectionActionView.as_view()),
]