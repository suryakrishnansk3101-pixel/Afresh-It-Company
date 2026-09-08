import os
import logging
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.core.mail import send_mail
from django.conf import settings
from .models import Enquiry
from .serializers import EnquirySerializer

logger = logging.getLogger(__name__)

class EnquiryCreateView(generics.CreateAPIView):
    """
    POST /api/enquiries/
    Accepts form-data or JSON, validates inputs, saves Enquiry to database,
    and dispatches Gmail SMTP email notification to COMPANY_EMAIL.
    """
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "status": "error",
                "message": "Validation failed.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        # Step 1: Save enquiry to MySQL database first
        enquiry = serializer.save()
        logger.info(f"Successfully saved enquiry ID {enquiry.id} for {enquiry.email} to MySQL database.")

        # Step 2: Attempt Gmail SMTP notification (non-blocking for DB record)
        email_sent = False
        try:
            email_sent = self.send_notification_email(enquiry)
        except Exception as err:
            logger.error(f"Unexpected error during email notification dispatch: {err}")

        # Step 3: Return clear success JSON response (never exposing SMTP secrets)
        return Response({
            "status": "success",
            "message": "Thank you! Your enquiry has been submitted successfully. Our team will contact you soon.",
            "data": serializer.data,
            "email_sent": email_sent
        }, status=status.HTTP_201_CREATED)

    def send_notification_email(self, enquiry):
        """
        Formats and sends an email notification to COMPANY_EMAIL using Gmail SMTP settings.
        Maintains database integrity even if SMTP fails or credentials are unconfigured.
        """
        host_user = os.getenv('EMAIL_HOST_USER', getattr(settings, 'EMAIL_HOST_USER', ''))
        company_email = os.getenv('COMPANY_EMAIL', getattr(settings, 'COMPANY_EMAIL', host_user or 'contact@afreshit.com'))

        if not host_user:
            logger.warning("EMAIL_HOST_USER is not configured in environment. Skipping Gmail SMTP notification.")
            return False

        subject = "New Website Enquiry - Afresh IT"
        
        resume_filename = os.path.basename(enquiry.resume.name) if enquiry.resume else "None attached"

        body = (
            f"New Website Enquiry - Afresh IT\n"
            f"========================================\n"
            f"Name: {enquiry.name}\n"
            f"Email: {enquiry.email}\n"
            f"Phone: {enquiry.phone}\n"
            f"Company Name: {enquiry.company_name or 'N/A'}\n"
            f"Selected Service: {enquiry.service or 'General Inquiry'}\n"
            f"Attachment / Resume: {resume_filename}\n"
            f"Submission Date/Time: {enquiry.created_at.strftime('%Y-%m-%d %H:%M:%S UTC')}\n"
            f"========================================\n\n"
            f"Message Content:\n"
            f"{enquiry.message or 'No message text provided.'}\n"
        )

        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL or host_user,
                recipient_list=[company_email],
                fail_silently=False
            )
            logger.info(f"Gmail SMTP notification sent successfully to {company_email} for enquiry ID {enquiry.id}.")
            return True
        except Exception as e:
            # Log error details silently; DB record remains safely stored in MySQL
            logger.error(f"Gmail SMTP Notification Error for Enquiry #{enquiry.id}: {e}")
            return False
