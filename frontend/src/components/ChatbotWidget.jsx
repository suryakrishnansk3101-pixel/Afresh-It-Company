import React, { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '../services/api';
import { Bot, MessageSquare, X, Send, Loader2, Sparkles, User, RefreshCw } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hi! I'm Afresh AI. How can I help you learn about Afresh IT's services, technologies, or projects?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    
    const trimmedMessage = inputText.trim();
    if (!trimmedMessage || isLoading) return;

    // Add User message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: trimmedMessage
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const data = await sendChatMessage(trimmedMessage);
      const aiReply = data?.response || data?.reply || "Sorry, I'm unable to respond right now. Please try again or contact our team through the enquiry form.";
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chatbot API error:', error);
      const fallbackMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: "Sorry, I'm unable to respond right now. Please try again or contact our team through the enquiry form."
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full glow-btn text-white shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer"
          aria-label="Open Afresh AI Chatbot"
        >
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#0a0e1a] animate-pulse" />
          <Bot className="w-7 h-7 group-hover:rotate-12 transition-transform" />
        </button>
      )}

      {/* Chat Window Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[380px] h-[520px] max-h-[82vh] glass-card rounded-3xl border border-purple-500/40 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-purple-600/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-white text-base">
                  <span>Afresh AI</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Official IT Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              aria-label="Close Chat Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/70 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 items-start ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0 mt-0.5 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-600'
                      : 'bg-gradient-to-tr from-purple-600 to-indigo-600'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[78%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-tr-none shadow-md'
                      : 'glass-card border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="glass-card p-3 rounded-2xl rounded-tl-none border border-slate-800 text-slate-400 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-xs">Thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input & Action Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              maxLength={500}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about services, tech stack, or projects..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-purple-500 transition-colors"
            />
            
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className={`p-2.5 rounded-xl glow-btn text-white transition-all ${
                !inputText.trim() || isLoading
                  ? 'opacity-40 cursor-not-allowed'
                  : 'cursor-pointer hover:scale-105'
              }`}
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
