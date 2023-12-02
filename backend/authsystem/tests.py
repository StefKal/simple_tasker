from django.test import TestCase
from rest_framework.test import APIClient
from authsystem.factories.tasks import TaskFactory
from authsystem.models import User
from pdb import set_trace as pbd


class UserViewSetTest(TestCase):
    def setUp(self):
        # Create test users and tasks
        user1_data = {
            'email': 'user1@test.com',
            'password': 'testpassword',
        }
        user2_data = {
            'email': 'user2@test.com',
            'password': 'testpassword',
        }

        self.user1 = User.objects.create_user(**user1_data)
        self.user2 = User.objects.create_user(**user2_data)
        self.task1 = TaskFactory(user=self.user1, completed=False)
        self.task2 = TaskFactory(user=self.user1, completed=True)  # User1's completed task
        self.task3 = TaskFactory(user=self.user2, completed=False)
        self.task4 = TaskFactory(user=self.user2, completed=True)  # User2's completed task

        self.client = APIClient()

    def test_authenticated_user_can_view_tasks(self):
        # Authenticate user1
        self.client.force_authenticate(user=self.user1)

        # Make a GET request to view the tasks
        response = self.client.get(f'/users/{str(self.user1.uuid)}/get_tasks/')
        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)

        # Check that user1's tasks are in the response data and not completed
        self.assertIn(self.task1.id, [task['id'] for task in response.data])
        self.assertNotIn(self.task2.id, [task['id'] for task in response.data])  # User1's completed task

    def test_unauthenticated_user_cannot_view_tasks(self):
        # Make a GET request to view the tasks without authentication
        response = self.client.get(f'/users/{str(self.user1.uuid)}/get_tasks/')  # Replace with your API endpoint

        # Check that the response status code is 401 (Unauthorized)
        self.assertEqual(response.status_code, 401)

    def test_user_cannot_view_other_user_tasks(self):
        # Authenticate user2
        self.client.force_authenticate(user=self.user2)

        # Try to get tasks for user 1
        response = self.client.get(f'/users/{str(self.user1.uuid)}/get_tasks/')  # Replace with your API endpoint

        self.assertEqual(response.status_code, 404)

    def test_user_does_not_view_completed_tasks(self):
        # Authenticate user1
        self.client.force_authenticate(user=self.user1)

        # Make a GET request to view the tasks
        response = self.client.get(f'/users/{str(self.user1.uuid)}/get_tasks/')
        pbd()
        # Check that the response status code is 200 (OK)
        self.assertEqual(response.status_code, 200)
        # Check that user1's tasks are in the response data and not completed
        self.assertIn(self.task1.id, [task['id'] for task in response.data])
        self.assertNotIn(self.task2.id, [task['id'] for task in response.data])
