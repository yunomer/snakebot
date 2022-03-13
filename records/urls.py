from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from records import views

urlpatterns = [
    path('', views.RecordView.as_view(), name='records'),
    path('create', views.createRecord, name='create'),
    path('delete/:id', views.deleteRecord, name='delete'),
]