
import React, { useState } from 'react';
import { Mail, Send, MessageSquare, Phone, MapPin } from 'lucide-react';
import { useTheme } from '../App';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className={`min-h-screen py-20 px-4 ${theme === 'dark' ? 'dark-grid' : 'light-grid'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-4">Get in Touch</h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
            Have questions about our products or need support? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="bg-blue-500/10 p-4 rounded-2xl w-fit mb-6">
                <Mail className="text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="text-zinc-500 mb-4">Support: support@dpmarket.pro</p>
              <p className="text-zinc-500">Business: biz@dpmarket.pro</p>
            </div>

            <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="bg-green-500/10 p-4 rounded-2xl w-fit mb-6">
                <MessageSquare className="text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Live Chat</h3>
              <p className="text-zinc-500 mb-4">We're available on WhatsApp and Telegram.</p>
              <button className="text-blue-500 font-bold hover:underline">Chat with us</button>
            </div>
            
            <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
              <div className="bg-yellow-500/10 p-4 rounded-2xl w-fit mb-6">
                <MapPin className="text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Office</h3>
              <p className="text-zinc-500">Bangalore, India</p>
              <p className="text-zinc-500">123 Tech Hub, Indiranagar</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 p-10 rounded-3xl border ${theme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200 shadow-xl'}`}>
            <h2 className="text-2xl font-bold mb-8">Send us a Message</h2>
            
            {sent ? (
              <div className="bg-green-500/10 border border-green-500/20 text-green-500 p-8 rounded-2xl text-center">
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                    <input 
                      required
                      placeholder="John Doe"
                      className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        theme === 'dark' ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500' : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                    <input 
                      type="email"
                      required
                      placeholder="john@example.com"
                      className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                        theme === 'dark' ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500' : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Subject</label>
                  <input 
                    required
                    placeholder="Product Inquiry"
                    className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      theme === 'dark' ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500' : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-zinc-500">Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="Tell us more about what you need..."
                    className={`w-full p-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                      theme === 'dark' ? 'bg-zinc-900 border-zinc-800 focus:ring-blue-500' : 'bg-zinc-50 border-zinc-200 focus:ring-blue-500'
                    }`}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl transition-all neon-blue-glow flex items-center justify-center"
                >
                  Send Message <Send className="ml-3" size={24} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
