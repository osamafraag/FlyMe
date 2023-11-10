import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "flyMe.settings")
app = Celery("flyMe")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
@app.task(bind=True, ignore_result=False)
def debug_task(self):
    print(f'Request: {self.request!r}')

app.autodiscover_tasks()