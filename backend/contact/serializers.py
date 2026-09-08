from rest_framework import serializers
from .models import Enquiry

MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = [
            'id',
            'name',
            'email',
            'phone',
            'company_name',
            'service',
            'message',
            'resume',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        return value.strip()

    def validate_email(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Email is required.")
        return value.strip().lower()

    def validate_phone(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("Phone number is required.")
        return value.strip()

    def validate_resume(self, value):
        if value:
            if value.size > MAX_FILE_SIZE_BYTES:
                raise serializers.ValidationError("Uploaded file exceeds maximum allowed size of 10MB.")
        return value
