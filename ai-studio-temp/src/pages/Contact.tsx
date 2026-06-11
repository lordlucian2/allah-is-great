import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import InteractiveMap from '../components/InteractiveMap';

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill out all mandatory fields (Name, Email, and Message).');
      return;
    }

    setErrorMessage('');
    setIsSubmitSuccess(true);
    
    // Clear form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleQuickWhatsAppGrid = (topic: string) => {
    const text = `Hello ALLAH IS GREAT store! I would like to inquire about details concerning "${topic}"!`;
    window.open(`https://wa.me/231776070131?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className={`transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      
      {/* 1. TOP HEADER BANNER GREETINGS */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:py-20 text-center">
        <div className="absolute inset-0 opacity-15">
          <svg className="w-full h-full stroke-slate-600" strokeWidth="0.5" fill="none">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect width="40" height="40" fill="none" />
                <path d="M 40 0 L 0 0 0 40" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-amber-500 font-bold">Inquiries & Locations</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight uppercase font-sans">
            Get in Touch
          </h1>
          <div className="w-16 h-1.5 bg-amber-500 mx-auto rounded-full" />
          <p className="text-sm max-w-md mx-auto opacity-70">
            Have an electrical installation project or stock question? Fill our contact form or chat directly!
          </p>
        </div>
      </section>


      {/* 2. BODY COLUMNS DETAILS vs FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: CONTACT DETAILS info cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visit card */}
            <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all hover:scale-101 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0 border border-amber-500/20 shadow-inner">
                <MapPin size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Visit Us</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Main Distribution Outlet Location:</p>
                <p className="text-xs font-bold font-sans">New Georgia Estate, Monrovia, Liberia</p>
              </div>
            </div>

            {/* Call card */}
            <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all hover:scale-101 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0 border border-amber-500/20 shadow-inner">
                <Phone size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Call Us</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Direct sales hotlines:</p>
                <div className="text-xs font-bold font-sans space-y-0.5">
                  <p><a href="tel:+231776070131" className="hover:text-amber-500 transition-colors">+231776070131</a></p>
                  <p><a href="tel:+231778010151" className="hover:text-amber-500 transition-colors">+231778010151</a></p>
                </div>
              </div>
            </div>

            {/* Email card */}
            <div className={`p-6 rounded-2xl border flex items-start space-x-4 transition-all hover:scale-101 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl shrink-0 border border-amber-500/20 shadow-inner">
                <Mail size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-white">Email Us</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Official administrative inbox:</p>
                <p className="text-xs font-bold font-mono text-amber-500">
                  <a href="mailto:contact@allahisgreat.com">contact@allahisgreat.com</a>
                </p>
              </div>
            </div>

            {/* Hours summary block */}
            <div className={`p-6 rounded-2xl border ${
              darkMode ? 'bg-slate-900/60 border-slate-801' : 'bg-slate-100 border-slate-205'
            }`}>
              <h4 className="font-extrabold text-xs uppercase tracking-widest text-slate-400 mb-2">WhatsApp Fast Response</h4>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Our sales dispatcher receives direct messages and stock catalogs continuous throughout the day. Send us a template for direct assistance!
              </p>
              <button
                onClick={() => handleQuickWhatsAppGrid("Bulk custom order assistance")}
                className="mt-4 flex items-center space-x-2 text-xs font-black text-amber-500 hover:text-amber-600 transition-colors"
              >
                <MessageSquare size={13} />
                <span>Text On WhatsApp Now</span>
              </button>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT INTERACTIVE FORM CARD */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-3xl border ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              
              <AnimatePresence mode="wait">
                {isSubmitSuccess ? (
                  /* Success popout */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-12 px-4 text-center space-y-4"
                  >
                    <div className="p-4 bg-emerald-500/10 text-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto border border-emerald-500/20 shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-900 dark:text-white">Message Dispatched Successfully!</h3>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                        Thank you so much! We have received your inquiry. A representative from the <strong>ALLAH IS GREAT</strong> store will contact you via email or WhatsApp immediately.
                      </p>
                    </div>
                    <button
                      onClick={() => setIsSubmitSuccess(false)}
                      className="px-6 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {errorMessage && (
                      <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500 flex items-center space-x-2">
                        <AlertCircle size={14} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Name input */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-name" htmlFor="contact-name" className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Name *</label>
                      <input 
                        type="text" 
                        id="contact-name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-100' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-email" htmlFor="contact-email" className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address *</label>
                      <input 
                        type="email" 
                        id="contact-email"
                        placeholder="johndoe@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-100' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Subject Input */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-subject" htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                      <input 
                        type="text" 
                        id="contact-subject"
                        placeholder="Inquiry about solar batteries/power converters"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className={`py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-100' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Message Textarea */}
                    <div className="flex flex-col space-y-1.5">
                      <label id="lbl-contact-message" htmlFor="contact-message" className="text-xs font-bold uppercase tracking-wider text-slate-400">Message *</label>
                      <textarea 
                        id="contact-message"
                        rows={4}
                        placeholder="Please write your detailed message or stock inquiry here..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className={`py-2.5 px-3.5 text-xs rounded-xl border focus:outline-none focus:ring-1 focus:ring-amber-500 ${
                          darkMode 
                            ? 'bg-slate-950 border-slate-800 text-slate-100' 
                            : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      />
                    </div>

                    {/* Send trigger */}
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black uppercase tracking-wider text-xs rounded-xl flex items-center justify-center space-x-2 transition-all active:scale-95 cursor-pointer shadow-md"
                    >
                      <Send size={14} />
                      <span>Send Message</span>
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </section>


      {/* 3. CORE INTERACTIVE LOCATION MAP GRID */}
      <section className={`py-12 border-t ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-inner'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1 text-center sm:text-left">
            <h2 className="text-xl font-extrabold tracking-tight">Our Outlet Coordinates</h2>
            <p className="text-xs text-slate-400 pb-2">Toggle satellite view to see our exact road blocks in Gardnersville / New Georgia Estate.</p>
          </div>
          <InteractiveMap darkModeState={darkMode} />
        </div>
      </section>

    </div>
  );
}
