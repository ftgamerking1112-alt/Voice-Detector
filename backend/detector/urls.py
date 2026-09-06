from django.urls import path
from .views import upload_audio, api_root

urlpatterns = [
    path('', api_root, name='api_root'),
    path('upload/', upload_audio, name='upload_audio'),
]