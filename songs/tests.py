from rest_framework.test import APITestCase
from .models import Song, Binder, BinderPage
from django.contrib.auth.models import User
from rest_framework import status
import json


class SongsTest(APITestCase):

    def setUp(self):

        self.songs_url = '/api/songs/'
        self.binders_url = '/api/binders/'
        self.binders_action_url = self.binders_url + 'action/'

        self.user1 = self.generate_user('testuser', 'test@example.com', 'testpassword')
        self.user2 = self.generate_user('testuser2', 'test2@example.com', 'testpassword')

        self.song1 = self.generate_song(self.user1['user'], "PR")
        self.song2 = self.generate_song(self.user2['user'], "PU")
        self.song3 = self.generate_song(self.user1['user'], "PU")
        self.song4 = self.generate_song(self.user2['user'], "PR")

        self.binder1 = self.generate_binder(self.user1['user'], "PR")
        self.binder2 = self.generate_binder(self.user2['user'], "PU")
        self.binder3 = self.generate_binder(self.user1['user'], "PU")
        self.binder4 = self.generate_binder(self.user2['user'], "PR")

        self.numSongs = len(Song.objects.all())
        self.numBinders = len(Binder.objects.all())
        self.numBinderPages = len(BinderPage.objects.all())

    def generate_user(self, username, email, password):
        return {
            'user': User.objects.create_user(username, email, password),
            'username': username,
            'email': email,
            'password': password,
            'id': str(User.objects.latest('id').id)
        }
    
    def generate_song(self, user, scope):
        return {
            'song': Song.objects.create(title="song", artist="artist", user=user, scope=scope),
            'url': self.songs_url + str(Song.objects.latest('id').id) + '/'
        }

    def generate_binder(self, user, scope):
        return {
            'binder': Binder.objects.create(title="binder", user=user, scope=scope),
            'url': self.binders_url + str(Binder.objects.latest('id').id) + '/'
        }

    def get_token(self, user):
        data = {
            'username': user['username'],
            'password': user['password']
        }
        resp = self.client.post('/api/token/', data, format='json')
        resp_content = json.loads(resp.content.decode('utf-8'))
        return resp_content["access"]

    def authenticated_request(self, method, url, data, token):
        auth = 'Bearer {}'.format(token)
        if method is 'get':
            return self.client.get(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method is 'post':
            return self.client.post(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method is 'put':
            return self.client.put(url, data, HTTP_AUTHORIZATION=auth, format='json')
        if method is 'delete':

            return self.client.delete(url, data, HTTP_AUTHORIZATION=auth)


    #-------------------------------------------------------------------------#
    # SONGS                                                                   #
    #-------------------------------------------------------------------------#

    def test_can_create_song(self):

        data = {
            'title': 'song3',
            'artist': 'artist3'
        }

        # Song not created if unauthorized
        resp = self.client.post(self.songs_url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Song.objects.count(), self.numSongs)

        # Song created while authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('post', self.songs_url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Song.objects.count(), self.numSongs + 1)
        self.assertEqual(Song.objects.latest('id').user, self.user1['user'])

    def test_can_get_song(self):

        # Can't get song if unauthorized
        resp = self.client.get(self.song1['url'])
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can get own song while authorized
        token = self.get_token(self.user2)
        resp = self.authenticated_request('get', self.song2['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Can't get other user's song if it's private
        resp = self.authenticated_request('get', self.song1['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

        # Can get other user's song if it's public
        token = self.get_token(self.user1)
        resp = self.authenticated_request('get', self.song2['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

    def test_can_edit_song(self):
        
        data = {
            'title': 'new title'
        }

        # Can't edit song if unauthorized
        resp = self.client.put(self.song1['url'], data)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)        

        # Can edit own song while authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('put', self.song1['url'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)

        # Can't edit other user's song
        resp = self.authenticated_request('put', self.song2['url'], data, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

    def test_can_delete_song(self):
    
        # Can't delete song if unauthorized
        resp = self.client.delete(self.song1['url'])
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can delete own song while authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('delete', self.song1['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)

        # Can't delete other user's song
        resp = self.authenticated_request('delete', self.song2['url'], {}, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)


    #-------------------------------------------------------------------------#
    # BINDERS                                                                 #
    #-------------------------------------------------------------------------#

    def test_can_create_binder(self):

        data = {
            'title': 'binder'
        }

        # Can't create binder if unauthorized
        resp = self.client.post(self.binders_url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Binder.objects.count(), self.numBinders)
        
        # Can create binder if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('post', self.binders_url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Binder.objects.count(), self.numBinders + 1)
        self.assertEqual(Binder.objects.latest('id').user, self.user1['user'])

    def test_can_add_song_to_binder(self):

        data = {
            'song': self.song1['song'].id,
            'binder': self.binder1['binder'].id
        }

        data2 = {
            'song': self.song2['song'].id,
            'binder': self.binder1['binder'].id
        }

        data3 = {
            'song': self.song1['song'].id,
            'binder': self.binder2['binder'].id
        }

        url = self.binders_action_url
        
        # Can't add song if unauthorized
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can add song if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        numSongs = len(self.binder1['binder'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if already added
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        numSongs = len(self.binder1['binder'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if not own song
        resp = self.authenticated_request('post', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.binder1['binder'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if not own binder
        resp = self.authenticated_request('post', url, data3, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.binder2['binder'].songs.all())
        self.assertEqual(numSongs, 0)

    def test_can_remove_song_from_binder(self):

        BinderPage.objects.create(song=self.song1['song'], binder=self.binder1['binder'])
        BinderPage.objects.create(song=self.song3['song'], binder=self.binder1['binder'])
        BinderPage.objects.create(song=self.song2['song'], binder=self.binder2['binder'])
        numSongs = len(self.binder1['binder'].songs.all())
        self.assertEqual(numSongs, 2)
        numSongs = len(self.binder2['binder'].songs.all())
        self.assertEqual(numSongs, 1)

        data = {
            'song': self.song1['song'].id,
            'binder': self.binder1['binder'].id
        }

        data2 = {
            'song': self.song2['song'].id,
            'binder': self.binder2['binder'].id
        }

        url = self.binders_action_url
        
        # Can't remove song if unauthorized
        resp = self.client.delete(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can remove song if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('delete', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        numSongs = len(self.binder1['binder'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't remove song if not own binder
        resp = self.authenticated_request('delete', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.binder2['binder'].songs.all())
        self.assertEqual(numSongs, 1)