"""
Admin site model registration
"""
from django.contrib import admin
from .models import Song, Binder

admin.site.register(Song)
admin.site.register(Binder)
