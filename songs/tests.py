"""
Unit tests for the songs module
"""

import json
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from .models import Song, Binder, BinderPage


def generate_user(username, email, password):
    """Generates a user object"""
    return {
        'user': User.objects.create_user(username, email, password),
        'username': username,
        'email': email,
        'password': password,
        'id': str(User.objects.latest('id').id)
    }

class SongsTest(APITestCase):
    """Unit tests for songs"""

    def setUp(self):

        self.urls = {
            'songs': '/api/songs/',
            'binders': '/api/binders/',
            'binders_action': '/api/binders/action/'
        }

        self.users = [
            generate_user('testuser', 'test@example.com', 'testpassword'),
            generate_user('testuser2', 'test2@example.com', 'testpassword')
        ]

        self.songs = [
            self.generate_song(self.users[0]['user'], "PR"),
            self.generate_song(self.users[1]['user'], "PU"),
            self.generate_song(self.users[0]['user'], "PU"),
            self.generate_song(self.users[1]['user'], "PR")
        ]

        self.binders = [
            self.generate_binder(self.users[0]['user'], "PR"),
            self.generate_binder(self.users[1]['user'], "PU"),
            self.generate_binder(self.users[0]['user'], "PU"),
            self.generate_binder(self.users[1]['user'], "PR")
        ]

        self.count = {
            'songs': len(Song.objects.all()),
            'binders': len(Binder.objects.all()),
            'binder_pages': len(BinderPage.objects.all())
        }

    def generate_song(self, user, scope):
        """Generates a song and its respective URL"""
        return {
            'song': Song.objects.create(title="song", artist="artist", user=user, scope=scope),
            'url': self.urls['songs'] + str(Song.objects.latest('id').id) + '/'
        }

    def generate_binder(self, user, scope):
        """Generates a binder and its respective URL"""
        return {
            'binder': Binder.objects.create(title="binder", user=user, scope=scope),
            'url': self.urls['binders'] + str(Binder.objects.latest('id').id) + '/'
        }

    def get_token(self, user):
        """Retrieves the token for a user"""
        data = {
            'username': user['username'],
            'password': user['password']
        }
        resp = self.client.post('/api/token/', data, format='json')
        resp_content = json.loads(resp.content.decode('utf-8'))
        return resp_content["access"]

    def authenticated_request(self, method, url, data, token):
        """Performs an authenticated request of a specific method"""
        auth = 'Bearer {}'.format(token)
        if method == 'get':
            return self.client.get(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method == 'post':
            return self.client.post(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method == 'put':
            return self.client.put(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method == 'delete':
            return self.client.delete(url, data, HTTP_AUTHORIZATION=auth)
        return None


    #-------------------------------------------------------------------------#
    # SONGS                                                                   #
    #-------------------------------------------------------------------------#

    def test_can_create_song(self):
        """Ensure a song can be created"""

        data = {
            'title': 'song3',
            'artist': 'artist3'
        }

        # Song not created if unauthorized
        resp = self.client.post(self.urls['songs'], data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Song.objects.count(), self.count['songs'])

        # Song created while authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('post', self.urls['songs'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.count(), self.count['songs'] + 1)
        self.assertEqual(Song.objects.latest('id').user, self.users[0]['user'])

    def test_can_get_song(self):
        """Ensure a song can be retrieved"""

        # Can't get song if unauthorized
        resp = self.client.get(self.songs[0]['url'])
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can get own song while authorized
        token = self.get_token(self.users[1])
        resp = self.authenticated_request('get', self.songs[1]['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Can't get other user's song if it's private
        resp = self.authenticated_request('get', self.songs[0]['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

        # Can get other user's song if it's public
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('get', self.songs[1]['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_can_edit_song(self):
        """Ensure a song can be edited"""

        data = {
            'title': 'new title'
        }

        # Can't edit song if unauthorized
        resp = self.client.put(self.songs[0]['url'], data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)        

        # Can edit own song while authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('put', self.songs[0]['url'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Can't edit other user's song
        resp = self.authenticated_request('put', self.songs[1]['url'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_can_delete_song(self):
        """Ensure a song can be deleted"""

        # Can't delete song if unauthorized
        resp = self.client.delete(self.songs[0]['url'])
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can delete own song while authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('delete', self.songs[0]['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)

        # Can't delete other user's song
        resp = self.authenticated_request('delete', self.songs[1]['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


    #-------------------------------------------------------------------------#
    # BINDERS                                                                 #
    #-------------------------------------------------------------------------#

    def test_can_create_binder(self):
        """Ensure a binder can be created"""

        data = {
            'title': 'binder'
        }

        # Can't create binder if unauthorized
        resp = self.client.post(self.urls['binders'], data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Binder.objects.count(), self.count['binders'])

        # Can create binder if authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('post', self.urls['binders'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Binder.objects.count(), self.count['binders'] + 1)
        self.assertEqual(Binder.objects.latest('id').user, self.users[0]['user'])

    def test_can_add_song_to_binder(self):
        """Ensure a song can be added to a binder"""

        data = {
            'song': self.songs[0]['song'].id,
            'binder': self.binders[0]['binder'].id
        }

        data2 = {
            'song': self.songs[1]['song'].id,
            'binder': self.binders[0]['binder'].id
        }

        data3 = {
            'song': self.songs[0]['song'].id,
            'binder': self.binders[1]['binder'].id
        }

        url = self.urls['binders_action']

        # Can't add song if unauthorized
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can add song if authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        num_songs = len(self.binders[0]['binder'].songs.all())
        self.assertEqual(num_songs, 1)

        # Can't add song if already added
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        num_songs = len(self.binders[0]['binder'].songs.all())
        self.assertEqual(num_songs, 1)

        # Can't add song if not own song
        resp = self.authenticated_request('post', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        num_songs = len(self.binders[0]['binder'].songs.all())
        self.assertEqual(num_songs, 1)

        # Can't add song if not own binder
        resp = self.authenticated_request('post', url, data3, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        num_songs = len(self.binders[1]['binder'].songs.all())
        self.assertEqual(num_songs, 0)

    def test_can_remove_song_from_binder(self):
        """Ensure a song can be removed from a binder"""

        BinderPage.objects.create(song=self.songs[0]['song'], binder=self.binders[0]['binder'])
        BinderPage.objects.create(song=self.songs[2]['song'], binder=self.binders[0]['binder'])
        BinderPage.objects.create(song=self.songs[1]['song'], binder=self.binders[1]['binder'])
        num_songs = len(self.binders[0]['binder'].songs.all())
        self.assertEqual(num_songs, 2)
        num_songs = len(self.binders[1]['binder'].songs.all())
        self.assertEqual(num_songs, 1)

        data = {
            'song': self.songs[0]['song'].id,
            'binder': self.binders[0]['binder'].id
        }

        data2 = {
            'song': self.songs[1]['song'].id,
            'binder': self.binders[1]['binder'].id
        }

        url = self.urls['binders_action']

        # Can't remove song if unauthorized
        resp = self.client.delete(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can remove song if authorized
        token = self.get_token(self.users[0])
        resp = self.authenticated_request('delete', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        num_songs = len(self.binders[0]['binder'].songs.all())
        self.assertEqual(num_songs, 1)

        # Can't remove song if not own binder
        resp = self.authenticated_request('delete', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        num_songs = len(self.binders[1]['binder'].songs.all())
        self.assertEqual(num_songs, 1)
