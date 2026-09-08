import os
import time
import logging
from pathlib import Path
from dotenv import load_dotenv
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, Service, Project
from .serializers import ContactMessageSerializer, ServiceSerializer, ProjectSerializer
from .context_utility import get_website_context

# Always ensure .env is loaded
load_dotenv(Path(settings.BASE_DIR) / '.env', override=True)

logger = logging.getLogger(__name__)

@api_view(['GET'])
def health_check(request):
    """
    Health check endpoint to verify backend operation and DRF setup.
    """
    return Response({
        "status": "online",
        "app": "Afresh IT API Backend",
        "version": "1.0.0",
        "framework": "Django REST Framework"
    }, status=status.HTTP_200_OK)


class ContactCreateView(generics.CreateAPIView):
    """
    Endpoint to process contact form submissions.
    Saves message to Database and sends notification email via Gmail SMTP.
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def perform_create(self, serializer):
        contact_instance = serializer.save()
        if settings.EMAIL_HOST_USER and settings.EMAIL_HOST_PASSWORD:
            try:
                subject = f"[Afresh IT Website] Contact: {contact_instance.subject or 'New Inquiry'}"
                body = (
                    f"Name: {contact_instance.name}\n"
                    f"Email: {contact_instance.email}\n\n"
                    f"Message:\n{contact_instance.message}\n"
                )
                send_mail(
                    subject=subject,
                    message=body,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=True
                )
            except Exception as e:
                logger.error(f"SMTP Email Error: {e}")


class ServiceListView(generics.ListAPIView):
    """
    Endpoint listing all active IT services offered by Afresh IT.
    """
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer


class ProjectListView(generics.ListAPIView):
    """
    Endpoint listing all featured projects.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


SYSTEM_PROMPT = (
    "You are Afresh IT's official AI assistant.\n"
    "Your goal is to answer visitor questions accurately and helpfully using the AFRESH IT WEBSITE CONTEXT provided below.\n\n"
    "INSTRUCTIONS:\n"
    "1. Answer questions about Afresh IT's Services (Web Development, AI & Machine Learning, Software Development, Cloud Solutions, UI/UX Development, Digital Transformation), Tech Stack (Python, Django, React, JavaScript, MySQL, REST API, AI/ML, Generative AI, Streamlit), Featured Projects (AI Video Content Creator, Smart AI Support System, Clinical Management System), Tagline ('Building Digital Solutions for the Future'), Company Description, and Contact/Enquiry Form process (collecting Name, Email, Phone, Company, Service, Message, and Resume Upload) using the provided context.\n"
    "2. ONLY if the visitor asks about information NOT included in the website context below (such as specific pricing/rates, client list/names, CEO/executive names, physical office address, or unlisted services like native mobile apps), state:\n"
    "   \"I don't have that information available. Please contact the Afresh IT team through the enquiry form.\"\n"
    "3. Never invent or hallucinate pricing, clients, executive names, locations, or unsupported services.\n"
)


@api_view(['POST'])
def chatbot_view(request):
    """
    POST /api/chat/
    Website-Aware AI Chatbot endpoint powered by Google Gemini API.
    Provides answers about Afresh IT services, technologies, projects, and contact info.
    """
    user_prompt = request.data.get('message', '').strip()
    
    # Input validation & length protection
    if not user_prompt:
        return Response({
            "response": "Please enter a question or message.",
            "error": "Message is required."
        }, status=status.HTTP_400_BAD_REQUEST)

    if len(user_prompt) > 500:
        return Response({
            "response": "Message exceeds maximum allowed length of 500 characters.",
            "error": "Message too long."
        }, status=status.HTTP_400_BAD_REQUEST)

    api_key = os.getenv('GEMINI_API_KEY', getattr(settings, 'GEMINI_API_KEY', '')).strip()

    fallback_error_msg = "Our AI assistant is receiving high traffic right now. Please try again in a few moments or contact our team through the enquiry form."

    if not api_key:
        logger.error("GEMINI_API_KEY is MISSING in backend environment.")
        return Response({
            "response": fallback_error_msg,
            "reply": fallback_error_msg
        }, status=status.HTTP_200_OK)

    logger.info("GEMINI_API_KEY: FOUND in environment.")

    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        
        website_context = get_website_context()
        
        prompt_content = (
            f"{SYSTEM_PROMPT}\n"
            f"AFRESH IT WEBSITE CONTEXT:\n"
            f"{website_context}\n\n"
            f"VISITOR QUESTION:\n"
            f"{user_prompt}"
        )
        
        # Actively supported Gemini models (gemini-3.5-flash, gemini-flash-latest, gemini-3.5-flash-lite)
        active_models = ['gemini-3.5-flash', 'gemini-flash-latest', 'gemini-3.5-flash-lite']
        reply_text = None

        for model_name in active_models:
            for attempt in range(2):
                try:
                    response = client.models.generate_content(
                        model=model_name,
                        contents=prompt_content
                    )
                    if hasattr(response, 'text') and response.text:
                        reply_text = response.text.strip()
                        logger.info(f"Successfully generated response using model: {model_name}")
                        break
                except Exception as model_err:
                    safe_err = str(model_err)
                    if api_key and api_key in safe_err:
                        safe_err = safe_err.replace(api_key, "[REDACTED]")
                    logger.warning(
                        f"Gemini model={model_name} attempt={attempt+1} failed: "
                        f"type={type(model_err).__name__} err={safe_err[:120]}"
                    )
                    if "429" in safe_err or "RESOURCE_EXHAUSTED" in safe_err or "503" in safe_err:
                        time.sleep(1)
                    continue
            if reply_text:
                break

        if not reply_text:
            logger.error("All active Gemini models failed to generate content. Returning fallback message.")
            reply_text = fallback_error_msg

        return Response({
            "response": reply_text,
            "reply": reply_text
        }, status=status.HTTP_200_OK)

    except Exception as err:
        safe_err = str(err)
        if api_key and api_key in safe_err:
            safe_err = safe_err.replace(api_key, "[REDACTED]")
        logger.error(f"Gemini API execution error: type={type(err).__name__} err={safe_err[:120]}")
        return Response({
            "response": fallback_error_msg,
            "reply": fallback_error_msg
        }, status=status.HTTP_200_OK)
