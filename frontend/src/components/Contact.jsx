import React, { useState } from 'react';
import { COMPANY_INFO, SERVICES } from '../data/constants';
import { submitEnquiry } from '../services/api';
import { Mail, Phone, MapPin, Send, Upload, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
    file: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    // Prepare multipart FormData
    const submissionData = new FormData();
    submissionData.append('name', formData.name.trim());
    submissionData.append('email', formData.email.trim());
    submissionData.append('phone', formData.phone.trim());
    if (formData.company) submissionData.append('company_name', formData.company.trim());
    if (formData.service) submissionData.append('service', formData.service);
    if (formData.message) submissionData.append('message', formData.message.trim());
    if (formData.file) submissionData.append('resume', formData.file);

    try {
      const response = await submitEnquiry(submissionData);
      setSuccessMessage(
        response?.message || "Thank you! Your enquiry has been submitted successfully. Our team will contact you soon."
      );
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: '',
        file: null
      });

      // Clear file input DOM reference if any
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

    } catch (error) {
      console.error('Submission failed:', error);
      const serverMsg = error.response?.data?.message || error.response?.data?.errors?.resume?.[0];
      setErrorMessage(serverMsg || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Start Your <span className="text-gradient">Enquiry</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Have a question or ready to begin your next digital transformation project? Send us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-700/40 text-purple-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase">Email Us</div>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-white font-semibold hover:text-cyan-300 transition-colors">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-900/40 border border-cyan-700/40 text-cyan-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase">Call Us</div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-white font-semibold hover:text-cyan-300 transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-700/40 text-emerald-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase">Headquarters</div>
                  <div className="text-white font-semibold">
                    {COMPANY_INFO.location}
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800 text-slate-300 text-xs space-y-2">
              <div className="font-bold text-white text-sm">Response Time Guarantee</div>
              <p className="text-slate-400">Our engineering team reviews all technical project inquiries within 24 business hours.</p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-2xl border border-slate-800 relative">
              
              {/* Feedback Success Message Banner */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 flex items-start gap-3 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm mb-1">Enquiry Submitted</div>
                    <div className="text-xs text-emerald-200">{successMessage}</div>
                  </div>
                </div>
              )}

              {/* Feedback Error Message Banner */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-700/60 text-rose-300 flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white text-sm mb-1">Submission Failure</div>
                    <div className="text-xs text-rose-200">{errorMessage}</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                      Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                      Email <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                      Phone Number <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Tech Inc."
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors"
                    />
                  </div>
                </div>

                {/* Interested Service Dropdown */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Interested Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:outline-none focus:border-purple-500 text-sm transition-colors"
                  >
                    <option value="">Select a Service...</option>
                    {SERVICES.map((srv) => (
                      <option key={srv.id} value={srv.title} className="bg-slate-900 text-white">
                        {srv.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project timeline, requirements, or goals..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm transition-colors resize-none"
                  />
                </div>

                {/* Resume / File Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-2">
                    Attachment / Resume / Requirement Spec (Optional)
                  </label>
                  <div className="relative border-2 border-dashed border-slate-800 hover:border-purple-500/60 rounded-xl p-4 text-center transition-colors">
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                      <Upload className="w-4 h-4 text-purple-400" />
                      <span>{formData.file ? formData.file.name : "Upload PDF, DOCX, or Image (Max 10MB)"}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full glow-btn py-4 rounded-xl text-base font-semibold text-white inline-flex items-center justify-center gap-2 transition-all ${
                    isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Enquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
