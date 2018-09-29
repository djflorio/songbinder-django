"""
Unit test for the accounts app
"""
import json
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase


def generate_user(username, email, password):
    """Generates a user object"""
    User.objects.create_user(username, email, password)
    return {
        'username': username,
        'email': email,
        'password': password,
        'id': str(User.objects.latest('id').id)
    }

class UsersTest(APITestCase):
    """
    Tests for the users model
    """

    def setUp(self):

        self.user1 = generate_user('testuser', 'test@example.com', 'testpassword')
        self.user2 = generate_user('testuser2', 'test2@example.com', 'testpassword')

        self.user_count = len(User.objects.all())
        self.accounts_url = '/api/accounts/'
        self.token_url = '/api/token/'

    def get_token(self, username, password):
        """Gets the token of a specific user"""
        data = {
            'username': username,
            'password': password
        }
        resp = self.client.post('/api/token/', data, format='json')
        resp_content = json.loads(resp.content.decode('utf-8'))
        return resp_content["access"]

    def test_create_user(self):
        """
        Ensure we can create a new user and a valid token is created with it.
        """
        data = {
            'username': 'foobar',
            'email': 'foobar@example.com',
            'password': 'somepassword'
        }

        response = self.client.post(self.accounts_url, data, format='json')

        # Make sure we have two users in the database.
        self.assertEqual(User.objects.count(), self.user_count + 1)
        # And that we're returning a 201 created code.
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        # Make sure we return the username and email upon creation,
        # but not the password.
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertFalse('password' in response.data)

    def test_create_user_with_short_password(self):
        """
        Ensure user is not created for passwords shorter than 8 characters.
        """
        data = {
            'username': 'foobar',
            'email': 'foobarbaz@example.com',
            'password': 'foo'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        # Make sure 400 is returned.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # And that no user was created.
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_no_password(self):
        """
        Ensure user is not created with no password.
        """
        data = {
            'username': 'foobar',
            'email': 'foobarbaz@example.com',
            'password': ''
        }

        response = self.client.post(self.accounts_url, data, format='json')
        # Make sure 400 is returned.
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # And that no user was created.
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_too_long_username(self):
        """
        Ensure user is not created with too long of a username.
        """
        data = {
            'username': 'foo'*30,
            'email': 'foobarbaz@example.com',
            'password': 'foobar'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_no_username(self):
        """
        Ensure a user isn't created without a username
        """
        data = {
            'username': '',
            'email': 'foobarbaz@example.com',
            'password': 'foobar'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_preexisting_username(self):
        """
        Ensure a user isn't created with existing username
        """
        data = {
            'username': 'testuser',
            'email': 'user@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_with_preexisting_email(self):
        """
        Ensure user isn't created with existing email
        """
        data = {
            'username': 'testuser2',
            'email': 'test@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_invalid_email(self):
        """
        Ensure user isn't created with invalid email
        """
        data = {
            'username': 'foobarbaz',
            'email':  'testing',
            'passsword': 'foobarbaz'
        }


        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['email']), 1)

    def test_create_user_with_no_email(self):
        """
        Ensure user isn't created without email
        """
        data = {
            'username' : 'foobar',
            'email': '',
            'password': 'foobarbaz'
        }

        response = self.client.post(self.accounts_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), self.user_count)
        self.assertEqual(len(response.data['email']), 1)

    def test_get_jwt_token(self):
        """
        Ensure token can be retrieved
        """
        data = {
            'username': 'testuser',
            'password': 'testpassword'
        }

        wrong_data = {
            'username': 'testuser',
            'password': 'wrongpassword'
        }

        resp = self.client.post(self.token_url, wrong_data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

        resp = self.client.post(self.token_url, data, format='json')
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in resp.data)

    def test_delete_user(self):
        """
        Ensure that users can only delete their own accounts
        """
        url = self.accounts_url + self.user1['id'] + '/'
        url2 = self.accounts_url + self.user2['id'] + '/'

        resp = self.client.delete(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        token = self.get_token(self.user1['username'], self.user1['password'])
        resp = self.client.delete(url2, {}, HTTP_AUTHORIZATION='Bearer {}'.format(token))
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

        resp = self.client.delete(url, {}, HTTP_AUTHORIZATION='Bearer {}'.format(token))
        self.assertEqual(resp.status_code, status.HTTP_204_NO_CONTENT)

    def test_update_user(self):
        """
        Ensure that users can only update their own accounts
        """
        url = self.accounts_url + self.user1['id'] + '/'
        url2 = self.accounts_url + self.user2['id'] + '/'

        resp = self.client.patch(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        token = self.get_token(self.user1['username'], self.user1['password'])
        resp = self.client.patch(
            url2,
            {'email': 'new@new.com'},
            HTTP_AUTHORIZATION='Bearer {}'.format(token)
        )
        self.assertEqual(resp.status_code, status.HTTP_403_FORBIDDEN)

        resp = self.client.patch(
            url,
            {'email': 'new@new.com'},
            HTTP_AUTHORIZATION='Bearer {}'.format(token)
        )
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        