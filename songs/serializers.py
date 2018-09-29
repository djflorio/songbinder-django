"""
Serializers for the song and binder models
"""

from rest_framework import serializers
from .models import Song, Binder


class SongSerializer(serializers.ModelSerializer):
    """Song serializer"""
    class Meta:
        model = Song
        fields = '__all__'
        read_only_fields = ('user', 'formatVersion', 'binders')

class BinderSerializer(serializers.ModelSerializer):
    """Binder serializer"""
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Binder
        fields = ('id', 'user', 'title', 'subtitle', 'scope', 'songs')
        read_only_fields = ('user', 'songs')