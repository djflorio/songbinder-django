from rest_framework import viewsets
from .models import Song, Collection, CollectionPage
from .serializers import SongSerializer, CollectionSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist

from .permissions import IsOwnerPublicOrReadOnly

from rest_framework import mixins


class SongView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = (IsOwnerPublicOrReadOnly,)

class SongCreateView(generics.CreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def perform_create(self, serializer):
      serializer.save(user=self.request.user)

class SongListByUser(generics.ListAPIView):
    serializer_class = SongSerializer

    def get_queryset(self):
        """
        This view should return a list of all the songs for
        the user as determined by the uId portion of the URL.
        """
        uId = self.kwargs['uId']
        return Song.objects.filter(user=uId)

class CollectionView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (IsOwnerPublicOrReadOnly,)

class CollectionCreateView(generics.CreateAPIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def perform_create(self, serializer):
      serializer.save(user=self.request.user)

class CollectionListByUser(generics.ListAPIView):
    serializer_class = CollectionSerializer

    def get_queryset(self):
        """
        This view should return a list of all the songs for
        the user as determined by the uId portion of the URL.
        """
        uId = self.kwargs['uId']
        return Collection.objects.filter(user=uId)

class CollectionActionView(APIView):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer

    def post(self, request, format=None):
        songId = request.data['song']
        collectionId = request.data['collection']

        try:
            song = Song.objects.get(pk=songId)
            collection = Collection.objects.get(pk=collectionId)
        except Song.DoesNotExist:
            content = "No song with id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Collection.DoesNotExist:
            content = "No collection with id " + collectionId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != song.user or request.user != collection.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if collection in song.collections.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        CollectionPage.objects.create(song=song, collection=collection)
        
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        songId = request.data['song']
        collectionId = request.data['collection']

        try:
            song = Song.objects.get(pk=songId)
            collection = Collection.objects.get(pk=collectionId)
        except Song.DoesNotExist:
            content = "No song with id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Collection.DoesNotExist:
            content = "No collection with id " + collectionId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != collection.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if collection not in song.collections.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        try:
            toDelete = CollectionPage.objects.filter(song=song, collection=collection)
        except CollectionPage.DoesNotExist:
            content = "No collection page with collection id " + collectionId + " and song id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        toDelete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
