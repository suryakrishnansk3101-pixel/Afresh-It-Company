from django.urls import path
from .views import health_check, ContactCreateView, ServiceListView, ProjectListView, chatbot_view

urlpatterns = [
    path('health/', health_check, name='health_check'),
    path('contact/', ContactCreateView.as_view(), name='contact'),
    path('services/', ServiceListView.as_view(), name='service_list'),
    path('projects/', ProjectListView.as_view(), name='project_list'),
    path('chat/', chatbot_view, name='chatbot'),
]
