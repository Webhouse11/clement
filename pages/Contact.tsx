import React, { useState } from 'react';
import { Mail, Phone, Calendar, Send, Loader2, MessageCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { addMessage, contactData } = useData();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceInterest: 'General Inquiry',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 1. Prepare WhatsApp Logic
    // We use the raw number for dynamic text generation. 
    // The wa.link provided (xjujpe) maps to this number but doesn't allow dynamic body text easily via URL params.
    const phoneNumber = "2348060180077"; 
    
    const whatsappMessage = `*New Website Inquiry*
    
*Name:* ${formData.name}
*Email:* ${formData.email}
*Interest:* ${formData.serviceInterest}

*Message:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    // 2. Formester Endpoint (Email)
    const endpoint = "https://hbliudvd.formester.com/f/VZC4I2oOc";

    try {
      // Trigger WhatsApp immediately
      window.open(whatsappUrl, '_blank');

      // Send to Email service in background
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Save to local context so Admin Dashboard still sees it
        addMessage({
          name: formData.name,
          email: formData.email,
          serviceInterest: formData.serviceInterest,
          message: formData.message
        });
        
        setSubmitted(true);
        setFormData({ name: '', email: '', serviceInterest: 'General Inquiry', message: '' }); // Reset
      } else {
        // Even if email fails, WhatsApp likely opened, so we still show success but log error
        console.error("Email submission background error");
        setSubmitted(true); 
      }
    } catch (error) {
      console.error("Submission error:", error);
      // We still consider it submitted if WhatsApp opened
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20 bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-serif font-bold text-brand-dark mb-4">{contactData.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-white">
          
          {/* Image Sidebar */}
          <div className="relative h-[500px] lg:h-auto min-h-full group order-first">
             <img 
               src={contactData.sidebarImage}
               alt="Clement Motivates" 
               className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent"></div>
             
             <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                <blockquote className="font-serif italic text-lg mb-4">"{contactData.quote}"</blockquote>
                <p className="font-bold text-brand-secondary">- {contactData.quoteAuthor}</p>
             </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-brand-dark border-b border-slate-100 pb-2">Direct Contact</h3>
                <div className="flex items-center space-x-4 group">
                  <div className="p-3 bg-brand-light rounded-full text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">Email</p>
                    <a href={`mailto:${contactData.email}`} className="text-slate-800 hover:text-brand-accent font-medium">{contactData.email}</a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group">
                  <div className="p-3 bg-brand-light rounded-full text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">WhatsApp</p>
                    <a href={`tel:${contactData.whatsapp.replace(/[^0-9+]/g, '')}`} className="text-slate-800 hover:text-brand-accent font-medium">{contactData.whatsapp}</a>
                  </div>
                </div>
              </div>

              <div className="bg-brand-light p-6 rounded-2xl text-center">
                 <Calendar size={32} className="mx-auto mb-3 text-brand-accent" />
                 <h4 className="font-bold text-brand-dark mb-1">Book a Discovery Call</h4>
                 <p className="text-xs text-slate-500 mb-4">Free 15-minute consultation</p>
                 <a 
                   href="https://wa.link/xjujpe" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="block w-full bg-brand-dark text-white text-sm font-bold py-2 rounded-lg hover:bg-brand-primary transition-colors"
                 >
                    Check Availability
                 </a>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12 bg-green-50 rounded-2xl border border-green-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Opening WhatsApp...</h3>
                <p className="text-slate-600 text-sm max-w-xs mx-auto">
                  We've also sent a copy to our email. Please hit <b>"Send"</b> in the WhatsApp window that just opened.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-brand-primary font-bold text-sm hover:underline"
                >
                  Start another chat
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex items-center space-x-2 mb-2">
                  <MessageCircle className="text-green-500" size={24} />
                  <h3 className="text-xl font-bold text-brand-dark">Start WhatsApp Chat</h3>
                </div>
                <p className="text-sm text-slate-500 mb-4">Fill out the details below to start a conversation instantly on WhatsApp (and Email).</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Name</label>
                    <input 
                      required 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
                      placeholder="John Doe" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email</label>
                    <input 
                      required 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Service Interest</label>
                  <select 
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  >
                    <option>General Inquiry</option>
                    <option>Website Development</option>
                    <option>Personal Branding</option>
                    <option>Speaking Engagement</option>
                    <option>Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Message</label>
                  <textarea 
                    required 
                    name="message"
                    rows={4} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" 
                    placeholder="How can I help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#128C7E] transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle size={20} />
                      <span>Continue to WhatsApp</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-400 mt-2">
                   This will send an email copy and open WhatsApp to complete your request.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;