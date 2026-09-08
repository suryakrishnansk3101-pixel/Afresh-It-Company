from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True, default='')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} ({self.email})"


class Service(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon_name = models.CharField(max_length=50, help_text="Lucide icon identifier")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=100)
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated tech names")
    image_url = models.URLField(blank=True, default='')
    live_url = models.URLField(blank=True, default='')
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
