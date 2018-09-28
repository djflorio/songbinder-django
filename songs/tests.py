from rest_framework.test import APITestCase
from .models import Song, Collection, CollectionPage
from django.contrib.auth.models import User
from rest_framework import status
import json


class SongsTest(APITestCase):

    def setUp(self):

        self.songs_url = '/api/songs/'
        self.collections_url = '/api/collections/'
        self.collections_action_url = self.collections_url + 'action/'

        self.user1 = self.generate_user('testuser', 'test@example.com', 'testpassword')
        self.user2 = self.generate_user('testuser2', 'test2@example.com', 'testpassword')

        self.song1 = self.generate_song(self.user1['user'], "PR")
        self.song2 = self.generate_song(self.user2['user'], "PU")
        self.song3 = self.generate_song(self.user1['user'], "PU")
        self.song4 = self.generate_song(self.user2['user'], "PR")

        self.collection1 = self.generate_collection(self.user1['user'], "PR")
        self.collection2 = self.generate_collection(self.user2['user'], "PU")
        self.collection3 = self.generate_collection(self.user1['user'], "PU")
        self.collection4 = self.generate_collection(self.user2['user'], "PR")

        self.numSongs = len(Song.objects.all())
        self.numCollections = len(Collection.objects.all())
        self.numCollectionPages = len(CollectionPage.objects.all())

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

    def generate_collection(self, user, scope):
        return {
            'collection': Collection.objects.create(title="collection", user=user, scope=scope),
            'url': self.collections_url + str(Collection.objects.latest('id').id) + '/'
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
    # COLLECTIONS                                                             #
    #-------------------------------------------------------------------------#

    def test_can_create_collection(self):

        data = {
            'title': 'collection'
        }

        # Can't create collection if unauthorized
        resp = self.client.post(self.collections_url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(Collection.objects.count(), self.numCollections)
        
        # Can create collection if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('post', self.collections_url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Collection.objects.count(), self.numCollections + 1)
        self.assertEqual(Collection.objects.latest('id').user, self.user1['user'])

    def test_can_add_song_to_collection(self):

        data = {
            'song': self.song1['song'].id,
            'collection': self.collection1['collection'].id
        }

        data2 = {
            'song': self.song2['song'].id,
            'collection': self.collection1['collection'].id
        }

        data3 = {
            'song': self.song1['song'].id,
            'collection': self.collection2['collection'].id
        }

        url = self.collections_action_url
        
        # Can't add song if unauthorized
        resp = self.client.post(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can add song if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        numSongs = len(self.collection1['collection'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if already added
        resp = self.authenticated_request('post', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        numSongs = len(self.collection1['collection'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if not own song
        resp = self.authenticated_request('post', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.collection1['collection'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't add song if not own collection
        resp = self.authenticated_request('post', url, data3, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.collection2['collection'].songs.all())
        self.assertEqual(numSongs, 0)

    def test_can_remove_song_from_collection(self):

        CollectionPage.objects.create(song=self.song1['song'], collection=self.collection1['collection'])
        CollectionPage.objects.create(song=self.song3['song'], collection=self.collection1['collection'])
        CollectionPage.objects.create(song=self.song2['song'], collection=self.collection2['collection'])
        numSongs = len(self.collection1['collection'].songs.all())
        self.assertEqual(numSongs, 2)
        numSongs = len(self.collection2['collection'].songs.all())
        self.assertEqual(numSongs, 1)

        data = {
            'song': self.song1['song'].id,
            'collection': self.collection1['collection'].id
        }

        data2 = {
            'song': self.song2['song'].id,
            'collection': self.collection2['collection'].id
        }

        url = self.collections_action_url
        
        # Can't remove song if unauthorized
        resp = self.client.delete(url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        # Can remove song if authorized
        token = self.get_token(self.user1)
        resp = self.authenticated_request('delete', url, data, token)
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)
        numSongs = len(self.collection1['collection'].songs.all())
        self.assertEqual(numSongs, 1)

        # Can't remove song if not own collection
        resp = self.authenticated_request('delete', url, data2, token)
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)
        numSongs = len(self.collection2['collection'].songs.all())
        self.assertEqual(numSongs, 1)