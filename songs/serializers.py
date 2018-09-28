from rest_framework import serializers
from .models import Song, Collection, CollectionPage


class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = '__all__'
        read_only_fields = ('user', 'formatVersion', 'collections')

class CollectionSerializer(serializers.ModelSerializer):
    songs = SongSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ('id', 'user', 'title', 'subtitle', 'scope', 'songs')
        read_only_fields = ('user', 'songs')