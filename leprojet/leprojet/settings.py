"""
Django settings for leprojet project.

Generated by 'django-admin startproject' using Django 4.2.2.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""

from pathlib import os ,Path
# from decouple import config


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-6#gfos(lyd#i)_$ms-8si_%ka=jzn1^thclfb9$5nft^8k1bqt'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
#  qd tu vas déployer décommente cette partie SESSION_COOKIE_SECURE = True

SESSION_ENGINE = 'django.contrib.sessions.backends.signed_cookies'


ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'TheDash.apps.ThedashConfig',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
     'django_celery_beat',
    'django_celery_results',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'leprojet.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
         'DIRS': [
                    os.path.join(BASE_DIR, 'TheDash/templates'),
                ],

        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'TheDash.context_processors.random_string_context',
            ],
        },
    },
]

WSGI_APPLICATION = 'leprojet.wsgi.application'


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases
# DATABASES = {
#      'default': {
#                 'ENGINE': 'django.db.backends.sqlite3',
#           'NAME': BASE_DIR / 'db.sqlite3',
#       }
#  }
DATABASES = {
        'default': {
            'ENGINE': 'mssql',
             'NAME': 'INCIDENTS',
            'USER':  'SARATA',
            'PASSWORD':'Stage@@@@112233',
             "HOST": "LP-DSI-16\TEST",
             'PORT': '',
            #'ENGINE': 'mssql',
            #'NAME': 'RECON3',
            # 'USER':  'SVC_MPAYMENT',
            # 'PASSWORD':'Lkc_Kh23dSQpKb9dQ3',
            # 'HOST': 'SVR-DBCTC-01',
            # 'HOST': 'CONSOSQL\CONSOSQL',
            # "PORT": "59081",

            'OPTIONS': {
                'driver': 'ODBC Driver 17 for SQL Server',
            },
        },
    }



# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'
 
USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'TheDash', 'static'),
]



# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# settings.py

# Configurez vos paramètres d'email
# EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_PORT = 587
# EMAIL_HOST_USER = 'mtestMTN@gmail.com'
# EMAIL_HOST_PASSWORD = 'Stage@@@112233'
# DEFAULT_FROM_EMAIL='mtestMTN@gmail.com'
# EMAIL_USE_TLS = True  # ou False si vous utilisez SSL

# Ajoutez ces configurations pour Celery
# save Celery task results in Django's database
#    CELERY_RESULT_BACKEND = "django-db"
# This configures Redis as the datastore between Django + Celery
#    CELERY_BROKER_URL = config('CELERY_BROKER_REDIS_URL', default='redis://localhost:6379')
# CELERY_BROKER_URL = 'redis://localhost:6379/0'  # Remplacez par l'URL de votre broker (e.g., Redis)
# CELERY_BROKER_URL = 'redis://localhost:6379'  # Remplacez par l'URL de votre broker (e.g., Redis)

# this allows you to schedule items in the Django admin.
#   CELERY_BEAT_SCHEDULER = 'django_celery_beat.schedulers.DatabaseScheduler'

# CELERY_BEAT_SCHEDULE = {
#     'envoyer_emails_chaque_mardi': {
#         'task': 'TheDash.tasks.envoyer_emails',  # Exemple : 'myapp.tasks.envoyer_emails',
#         # 'schedule': crontab(day_of_week=6),  # Lundi est le jour 0, Mardi est le jour 1, etc.
#     },
# }
#   CELERY_TIMEZONE = "UTC"
# CELERY_TASK_TRACK_STARTED = True
# CELERY_TASK_TIME_LIMIT = 30 * 60