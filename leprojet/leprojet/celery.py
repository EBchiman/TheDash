import os

from celery import Celery




# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'leprojet.settings')

app = Celery('leprojet')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django apps.
app.autodiscover_tasks()


# @app.task(bind=True, ignore_result=True)
# def debug_task(self):
#     print(f'Request: {self.request!r}')

# path/to/your/proj/src/cfehome/celery.py

# Below is for illustration purposes. We 
# configured so we can adjust scheduling 
# in the Django admin to manage all 
# Periodic Tasks like below
app.conf.beat_schedule = {
    'envoyer_emails': {
        'task': 'TheDash.tasks.envoyer_emails',
         'schedule':120, #crontab(hour=7, minute=30, day_of_week=1),
        
    },
}
