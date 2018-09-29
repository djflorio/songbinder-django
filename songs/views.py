"""
Views for songs and binders
"""

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Song, Binder, BinderPage
from .serializers import SongSerializer, BinderSerializer
from .permissions import IsOwnerPublicOrReadOnly


class SongView(generics.RetrieveUpdateDestroyAPIView):
    """
    View for retrieving, updating, and destroying songs
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = (IsOwnerPublicOrReadOnly,)

class SongCreateView(generics.CreateAPIView):
    """
    View for creating a song
    """
    queryset = Song.objects.all()
    serializer_class = SongSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SongListByUser(generics.ListAPIView):
    """
    View for listing all songs for a certain user
    """
    serializer_class = SongSerializer

    def get_queryset(self):
        """
        Return a list of all the songs for the user as determined by the
        uId portion of the URL.
        """
        user_id = self.kwargs['uId']
        return Song.objects.filter(user=user_id)

class BinderView(generics.RetrieveUpdateDestroyAPIView):
    """
    View for retrieving, updating, and destroying binders
    """
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer
    permission_classes = (IsOwnerPublicOrReadOnly,)

class BinderCreateView(generics.CreateAPIView):
    """
    View for creating a binder
    """
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class BinderListByUser(generics.ListAPIView):
    """
    View for listing all binders for a certain user
    """
    serializer_class = BinderSerializer

    def get_queryset(self):
        """
        Return a list of all the binders for the user as determined by the
        uId portion of the URL.
        """
        user_id = self.kwargs['uId']
        return Binder.objects.filter(user=user_id)

class BinderActionView(APIView):
    """
    View for adding and removing pages
    """
    queryset = Binder.objects.all()
    serializer_class = BinderSerializer

    def post(self, request):
        """Add a page to a binder"""
        song_id = request.data['song']
        binder_id = request.data['binder']

        try:
            song = Song.objects.get(pk=song_id)
            binder = Binder.objects.get(pk=binder_id)
        except Song.DoesNotExist:
            content = "No song with id " + song_id + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Binder.DoesNotExist:
            content = "No binder with id " + binder_id + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != song.user or request.user != binder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if binder in song.binders.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        BinderPage.objects.create(song=song, binder=binder)

        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request):
        """Remove a page from a binder"""
        song_id = request.data['song']
        binder_id = request.data['binder']

        try:
            song = Song.objects.get(pk=song_id)
            binder = Binder.objects.get(pk=binder_id)
        except Song.DoesNotExist:
            content = "No song with id " + song_id + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)
        except Binder.DoesNotExist:
            content = "No binder with id " + binder_id + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        if request.user != binder.user:
            return Response(status=status.HTTP_403_FORBIDDEN)

        if binder not in song.binders.all():
            return Response(status=status.HTTP_204_NO_CONTENT)

        try:
            to_delete = BinderPage.objects.filter(song=song, binder=binder)
        except BinderPage.DoesNotExist:
            content = "No binder page with binder id " + binder_id + " and song id " + song_id + " found."
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        to_delete.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
