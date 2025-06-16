# api/urls.py

from django.urls import path
from .views import api_root

urlpatterns = [
    path('', api_root),  # handles GET /api/
]
