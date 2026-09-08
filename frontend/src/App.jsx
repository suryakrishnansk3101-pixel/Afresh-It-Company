import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Technologies from './components/Technologies';
import WhyChooseUs from './components/WhyChooseUs';
import Projects from './components/Projects';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-slate-100 font-sans selection:bg-purple-500 selection:text-white relative">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        <Hero />
        <About />
        <Services />
        <Technologies />
        <WhyChooseUs />
        <Projects />
        <CTA />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}

