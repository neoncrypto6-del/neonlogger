import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
export function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormState({
        name: '',
        email: '',
        message: ''
      });
    }, 1500);
  };
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Contact NeonCrypto
            </h1>
            <p className="text-gray-400 text-lg">
              Have questions about your bonus or wallet recovery? Our support
              team is available 24/7 to assist you.
            </p>
          </div>

          <div className="glass p-6 rounded-xl border border-purple-neon/20">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-neon/20 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-neon" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Visit Our Office
                </h3>
                <p className="text-gray-400">
                  111 W 57th St
                  <br />
                  New York, NY 10019
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-gold-neon/20 rounded-lg">
                <Mail className="w-6 h-6 text-gold-neon" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
                <p className="text-gray-400">support@neoncrypto.com</p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-64 rounded-xl overflow-hidden glass border border-white/10 relative">
            <div className="absolute inset-0 bg-purple-900/20 flex items-center justify-center">
              <p className="text-gray-500 font-medium">
                Interactive Map Loading...
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass p-8 rounded-2xl border border-purple-neon/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">
            Send us a Message
          </h2>

          {submitted ?
          <div className="h-full flex flex-col items-center justify-center text-center py-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                <Send className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Message Sent!
              </h3>
              <p className="text-gray-400">
                Thank you for contacting us. We'll get back to you shortly.
              </p>
              <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-purple-neon hover:text-purple-400 font-medium">

                Send another message
              </button>
            </div> :

          <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2">

                  Name
                </label>
                <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={(e) =>
                setFormState({
                  ...formState,
                  name: e.target.value
                })
                }
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-purple-neon focus:ring-1 focus:ring-purple-neon outline-none transition-all"
                placeholder="Your name" />

              </div>

              <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2">

                  Email
                </label>
                <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={(e) =>
                setFormState({
                  ...formState,
                  email: e.target.value
                })
                }
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-purple-neon focus:ring-1 focus:ring-purple-neon outline-none transition-all"
                placeholder="your@email.com" />

              </div>

              <div>
                <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2">

                  Message
                </label>
                <textarea
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={(e) =>
                setFormState({
                  ...formState,
                  message: e.target.value
                })
                }
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-purple-neon focus:ring-1 focus:ring-purple-neon outline-none transition-all resize-none"
                placeholder="How can we help you?" />

              </div>

              <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-neon to-indigo-600 text-white font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70">

                {isSubmitting ? 'Sending...' : 'Send Message'}{' '}
                <Send className="w-4 h-4" />
              </button>
            </form>
          }
        </div>
      </div>
    </div>);

}