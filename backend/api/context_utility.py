# Website Content & Company Context Utility for Afresh IT Chatbot

WEBSITE_CONTEXT = """
OFFICIAL AFRESH IT WEBSITE CONTENT & COMPANY CONTEXT:

COMPANY INFORMATION:
- Name: Afresh IT
- Tagline: "Building Digital Solutions for the Future"
- Description: Afresh IT builds modern web, AI and software solutions that help businesses transform, automate and grow.

SERVICES OFFERED:
1. Web Development - Modern responsive websites and web applications built with high performance and scalable architectures.
2. AI & Machine Learning - Intelligent solutions using AI and machine learning to automate workflows and extract actionable insights.
3. Software Development - Custom software solutions engineered tailored specifically to meet unique business requirements.
4. Cloud Solutions - Scalable and reliable cloud-based applications deployed with best-in-class security standards.
5. UI/UX Development - Clean, intuitive and user-friendly digital experiences designed for maximum engagement and clarity.
6. Digital Transformation - Technology solutions that modernize infrastructure, optimize business processes, and accelerate growth.

TECHNOLOGIES & TECH STACK:
- Python
- Django
- React
- JavaScript
- MySQL
- REST API
- AI / ML
- Generative AI
- Streamlit

FEATURED DEMONSTRATION PROJECTS:
1. AI Video Content Creator
   - Technologies: Python, Generative AI, Streamlit
   - Description: An AI-powered application for generating video content using Generative AI.
2. Smart AI Support System
   - Technologies: Django, React, REST API, AI
   - Description: An AI-powered support system designed to assist users with common support-related queries.
3. Clinical Management System
   - Technologies: Django, React, MySQL
   - Description: A web-based management application for handling clinical management workflows.

CONTACT & ENQUIRY PROCESS:
- Visitors can contact Afresh IT by submitting their requirements through the online Contact/Enquiry form available on the website.
- The Enquiry form collects the following information:
  * Name (required)
  * Email (required)
  * Phone Number (required)
  * Company Name
  * Interested Service
  * Message
  * Attachment / Resume Upload (supports PDF, DOCX, Image up to 10MB)

INFORMATION NOT AVAILABLE / UNLISTED:
- Pricing / Rates: Not listed on the website. Instruct visitor to submit requirements via the enquiry form for a custom quote.
- Specific Client Names / Portfolio Logos: Not publicly listed.
- Office Locations / Physical Addresses: Specific physical address is not listed on the website.
- CEO / Executive Names: Individual executive names are not listed on the website.
- Mobile App Development (iOS / Android Native): Not explicitly listed in the 6 core services (only Web, AI/ML, Custom Software, Cloud, UI/UX, Digital Transformation).
"""

def get_website_context():
    """
    Returns the verified Afresh IT website context text string.
    """
    return WEBSITE_CONTEXT.strip()
