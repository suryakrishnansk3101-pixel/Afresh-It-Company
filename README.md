# Afresh IT — Company Website

Afresh IT is a modern, responsive IT company website built using React, Django REST Framework, MySQL, and Google Gemini AI.

> **Tagline**: *"Building Digital Solutions for the Future"*

---

## 1. Project Overview

Afresh IT is a full-stack corporate IT application engineered to showcase digital agency services, technical stacks, and portfolio projects while offering interactive client engagement tools. The system features:

- Complete company information & interactive project showcases
- Service and technology portfolio presentation
- Contact and talent acquisition enquiry form with resume upload
- Persistent database storage via MySQL
- Real-time automated email notifications via Gmail SMTP
- Official AI Assistant chatbot powered by Google Gemini API
- Fully responsive modern dark-theme user interface

---

## 2. Key Features

- **Modern Responsive Corporate UI**: Styled with glassmorphism aesthetics, dynamic glowing accents, and smooth section transitions.
- **Hero & Core Sections**: Interactive Hero, About Us, Services, Technologies, Projects, Why Choose Us, and Contact sections.
- **Contact & Enquiry Form**: Validates inputs, supports file/resume attachment uploads, and saves records to MySQL.
- **Resume Upload Handling**: Supports PDF, DOCX, and image file uploads up to 10MB stored securely server-side.
- **MySQL Data Persistence**: Strict relational database schema for enquiry records and service management.
- **Gmail SMTP Notifications**: Automated email notifications sent upon new enquiry submission.
- **Website-Aware Gemini Chatbot**: Integrated assistant trained on verified website content.
- **Anti-Hallucination Guardrails**: Strict fallback responses for unverified queries (such as unlisted pricing or physical location).
- **Mobile Responsive Navigation**: Touch-optimized hamburger drawer menu for mobile and tablet screens.
- **RESTful API Architecture**: Decoupled architecture using Django REST Framework and React Vite client.

---

## 3. Technology Stack

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS / Tailwind CSS (`@tailwindcss/vite`) + Lucide React Icons
- **HTTP Client**: Axios

### Backend
- **Language**: Python 3.12+
- **Framework**: Django 5.2+
- **API Framework**: Django REST Framework (DRF)
- **CORS Management**: `django-cors-headers`
- **Environment Management**: `python-dotenv`

### Database
- **Database Engine**: MySQL Server 8.0 (`mysqlclient` driver)

### AI Integration
- **SDK**: `google-genai` (v2.14.0)
- **Model**: Google Gemini API (`gemini-3.5-flash`, `gemini-flash-latest`, `gemini-3.5-flash-lite`)

### Email Service
- **SMTP**: Gmail SMTP (`smtp.gmail.com:587` with TLS)

---

## 4. Application Architecture

### System Data Flow
```text
React Frontend (Port 3000)
       │
       ▼  (REST API / CORS)
Django REST API (Port 8000)
       │
       ▼  (MySQL Protocol / Port 3307)
MySQL Database (afresh_it_db)
```

### Contact Enquiry Pipeline
```text
React Contact Form
       │
       ▼  POST /api/enquiries/ (Multipart Form Data)
Django REST Framework API
       │
       ├─────────────────────────┐
       ▼                         ▼
Save Enquiry & Resume     Send Notification Email
to MySQL Database         via Gmail SMTP Server
```

### AI Chatbot Pipeline
```text
React Chatbot Widget
       │
       ▼  POST /api/chat/ (JSON Payload)
Django Chatbot API View
       │
       ▼  Inject Verified Afresh IT Context
Google Gemini API (google-genai SDK)
       │
       ▼  Return Grounded Contextual Reply
React Chatbot Widget Display
```

---

## 5. Main Projects

### 1. AI Video Content Creator
- **Technologies**: Python, Generative AI, Streamlit
- **Description**: An AI-powered application for automated video content generation using Generative AI algorithms and interactive Streamlit UI.

### 2. Smart AI Support System
- **Technologies**: Django, React, REST API, AI
- **Description**: An AI-powered support application designed to assist enterprise users with common support-related workflows and automated query resolution.

### 3. Clinical Management System
- **Technologies**: Django, React, MySQL
- **Description**: A comprehensive web-based management platform for handling clinical workflows, patient records, and scheduling operations.

---

## 6. Contact Enquiry Workflow

Visitors submit their requirements through the website enquiry form by providing:
1. **Name** (Required)
2. **Email** (Required)
3. **Phone Number** (Required)
4. **Company Name** (Optional)
5. **Interested Service** (Optional)
6. **Message** (Required)
7. **Resume Attachment** (Optional - PDF/DOCX/Images up to 10MB)

### Backend Processing
1. Frontend sends a `multipart/form-data` request to `POST /api/enquiries/`.
2. Django validates email format, required fields, and file upload size/type.
3. The record is inserted into the `contact_enquiry` table in MySQL (`afresh_it_db`).
4. Resumes are safely stored in `backend/media/resumes/`.
5. An automated notification email is sent via Gmail SMTP to `COMPANY_EMAIL`.

---

## 7. AI Chatbot

The Afresh AI assistant is built using server-side integration with the Google Gemini API.

### Key Capabilities & Guardrails
- **Website Awareness**: The assistant is pre-grounded with verified company data (Services, Tech Stack, Featured Projects, Tagline, Enquiry details).
- **Server-Side Security**: The `GEMINI_API_KEY` remains strictly backend-side and is never exposed to client-side code or browser requests.
- **Anti-Hallucination Rules**: If a visitor asks about information not available in the company context (e.g., specific pricing rates, private client lists, executive names, physical location), the chatbot responds with:
  > *"I don't have that information available. Please contact the Afresh IT team through the enquiry form."*

---

## 8. Project Structure

```text
Afresh-It-Company/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── ChatbotWidget.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── CTA.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Technologies.jsx
│   │   │   └── WhyChooseUs.jsx
│   │   ├── data/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── api/
│   │   ├── context_utility.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── config/
│   │   ├── settings.py
│   │   └── urls.py
│   ├── contact/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── views.py
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 9. Backend Setup

### Prerequisites
- Python 3.12+
- MySQL Server 8.0

### Step-by-Step Instructions

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment**:
   - On Windows:
     ```cmd
     python -m venv venv
     venv\Scripts\activate
     ```
   - On Linux/macOS:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**:
   Copy `.env.example` to create `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your MySQL, Gmail SMTP, and Gemini API credentials in `.env`.

5. **Run database migrations**:
   ```bash
   python manage.py migrate
   ```

6. **Start the Django development server**:
   ```bash
   python manage.py runserver 8000
   ```
   The backend REST API will be available at `http://127.0.0.1:8000/api/`.

---

## 10. Frontend Setup

### Prerequisites
- Node.js (v18+) & npm

### Step-by-Step Instructions

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install Node dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://127.0.0.1:3000/`.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 11. Environment Variables

The project uses environment variables for secure credential management. Create `backend/.env` using `backend/.env.example` as a template:

```ini
# Django Configuration
SECRET_KEY=your_django_secret_key_here
DEBUG=False
ALLOWED_HOSTS=*

# Primary MySQL Database Configuration
DB_ENGINE=django.db.backends.mysql
DB_NAME=afresh_it_db
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_HOST=127.0.0.1
DB_PORT=3307

# Gmail SMTP Email Notification Credentials
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your_gmail@gmail.com
EMAIL_HOST_PASSWORD=your_google_app_password
COMPANY_EMAIL=your_gmail@gmail.com

# Gemini AI API Key Configuration
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Security Note**: Never commit your actual `.env` file or secrets to source control. The `.gitignore` file ensures `.env` remains local and protected.
