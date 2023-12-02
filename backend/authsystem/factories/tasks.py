import factory
from authsystem.models import Task, User


class TaskFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Task

    title = factory.Faker('sentence')
    completed = factory.Faker('boolean')
    user = factory.SubFactory(factory.django.DjangoModelFactory, model=User)
