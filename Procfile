web: gunicorn config.wsgi:application
worker: celery worker --app=scrits.taskapp --loglevel=info
