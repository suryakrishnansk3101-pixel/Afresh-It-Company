from django.db import models

class Enquiry(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    company_name = models.CharField(max_length=150, blank=True, default='')
    service = models.CharField(max_length=100, blank=True, default='')
    message = models.TextField(blank=True, default='')
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Enquiry'
        verbose_name_plural = 'Enquiries'

    def __str__(self):
        return f"Enquiry from {self.name} ({self.email}) - {self.service or 'General'}"
