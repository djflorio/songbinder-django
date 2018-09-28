from django.contrib import admin
from .models import Song, Collection

admin.site.register(Song)
admin.site.register(Collection)