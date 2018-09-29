"""
Song and Binder models
"""
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField


class Song(models.Model):
    """
    The Song model
    """
    title = models.CharField(max_length=200, blank=True)
    artist = models.CharField(max_length=200, blank=True)
    content = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    formatVersion = models.IntegerField(default=1)
    binders = models.ManyToManyField('Binder', through='BinderPage', related_name='songs', blank=True)
    scope = models.CharField(
        max_length=2,
        choices=(
            ("PR", "Private"),
            ("FR", "Friends"),
            ("PU", "Public"),
        ),
        default="PR"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Binder(models.Model):
    """
    A Binder is a collection of songs
    """
    title = models.CharField(max_length=200, blank=True)
    subtitle = models.TextField(blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    scope = models.CharField(
        max_length=2,
        choices=(
            ("PR", "Private"),
            ("FR", "Friends"),
            ("PU", "Public"),
        ),
        default="PR"
    )
    songOrder = ArrayField(models.IntegerField(), default=list, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class BinderPage(models.Model):
    """
    A BinderPage maps a song to a binder, allowing a many to many relationship
    """
    song = models.ForeignKey(Song, on_delete=models.CASCADE, related_name='page')
    binder = models.ForeignKey(Binder, on_delete=models.CASCADE, related_name='page')
    position = models.PositiveIntegerField(default=0)
