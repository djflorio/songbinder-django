from rest_framework import viewsets
from .models import Song, Binder, BinderPage
from .serializers import SongSerializer, BinderSerializer
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

class BinderView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer
    permission_classes = (IsOwnerPublicOrReadOnly,)

class BinderCreateView(generics.CreateAPIView):
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer

    def perform_create(self, serializer):
      serializer.save(user=self.request.user)

class BinderListByUser(generics.ListAPIView):
    serializer_class = BinderSerializer

    def get_queryset(self):
        """
        This view should return a list of all the songs for
        the user as determined by the uId portion of the URL.
        """
        uId = self.kwargs['uId']
        return Binder.objects.filter(user=uId)

class BinderActionView(APIView):
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer

    def post(self, request, format=None):
        songId = request.data['song']
        binderId = request.data['binder']

        try:
            song = Song.objects.get(pk=songId)
            binder = Binder.objects.get(pk=binderId)
        except Song.DoesNotExist:
            content = "No song with id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Binder.DoesNotExist:
            content = "No binder with id " + binderId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != song.user or request.user != binder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if binder in song.binders.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        BinderPage.objects.create(song=song, binder=binder)
        
        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, format=None):
        songId = request.data['song']
        binderId = request.data['binder']

        try:
            song = Song.objects.get(pk=songId)
            binder = Binder.objects.get(pk=binderId)
        except Song.DoesNotExist:
            content = "No song with id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Binder.DoesNotExist:
            content = "No binder with id " + binderId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != binder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if binder not in song.binders.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        try:
            toDelete = BinderPage.objects.filter(song=song, binder=binder)
        except BinderPage.DoesNotExist:
            content = "No binder page with binder id " + binderId + " and song id " + songId + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        toDelete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
