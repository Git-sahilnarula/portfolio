/**
 * Contact.jsx — Contact Details & 3-Tier Direct Email Delivery Form
 *
 * Email Delivery Architecture (No third-party SDK required):
 * 1. Primary: FormSubmit AJAX API (`https://formsubmit.co/ajax/{email}`) sends a formatted
 *    HTML table directly to Sahil's inbox.
 * 2. Secondary: Netlify Forms (`data-netlify="true"`) stores submissions in the Netlify dashboard.
 * 3. Fallback: Automatic `mailto:` pre-filled compose window if offline.
 */

import { useState } from 'react';

const INITIAL_FORM = { name: '', email: '', subject: '', message: '' };

const INPUT_FIELDS = [
  {
    id: 'name',
    label: 'Your Name',
    type: 'text',
    placeholder: 'Enter your name',
  },
  {
    id: 'email',
    label: 'Your Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    placeholder: 'Project / Hiring / Collaboration',
  },
];

export default function Contact({ personal }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [sending, setSending] = useState(false);

  // Contact metadata rows rendered on the left column
  const contactItems = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: 'fas fa-envelope',
    },
    {
      label: 'Phone',
      value: personal.phone,
      href: personal.phoneHref,
      icon: 'fas fa-phone-alt',
    },
    {
      label: 'Location',
      value: personal.location,
      href: null,
      icon: 'fas fa-map-marker-alt',
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: '', message: '' });

    try {
      // Tier 1: Direct FormSubmit AJAX email delivery
      const response = await fetch(
        `https://formsubmit.co/ajax/${personal.email}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            _subject: `[Portfolio Inquiry] ${formData.subject}`,
            _template: 'table',
            _captcha: 'false',
          }),
        }
      );

      // Tier 2: Background Netlify Forms capture when deployed on Netlify
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'portfolio-contact',
          ...formData,
        }).toString(),
      }).catch(() => {});

      const result = await response.json();
      if (response.ok && (result.success === 'true' || result.success === true)) {
        setStatus({
          type: 'success',
          message: 'Thank you! Your message has been delivered directly to Sahil.',
        });
        setFormData(INITIAL_FORM);
      } else {
        throw new Error('Fallback to mailto');
      }
    } catch {
      // Tier 3: Instant mailto fallback so no message is ever lost
      const subject = encodeURIComponent(`[Portfolio] ${formData.subject}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      );
      window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
      setStatus({
        type: 'success',
        message:
          'Opened your email client with your message pre-filled for instant delivery!',
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">Get In Touch</h2>
        <div className="w-20 h-1 bg-blue-600 dark:bg-blue-300 mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Social Links */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

            <div className="space-y-6">
              {contactItems.map((item) => (
                <div key={item.label} className="flex items-start">
                  <div className="p-3 bg-slate-200/80 dark:bg-slate-700 rounded-lg mr-4">
                    <i
                      className={`${item.icon} text-blue-600 dark:text-blue-300`}
                    ></i>
                  </div>
                  <div>
                    <h4 className="font-medium">{item.label}</h4>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-gray-600 dark:text-gray-300 hover:underline transition"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media Buttons */}
            <div className="mt-8">
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {personal.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-10 h-10 flex items-center justify-center bg-gray-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-200/70 dark:hover:bg-slate-700 transition"
                  >
                    <i
                      className={`${social.icon} text-gray-800 dark:text-gray-200`}
                    ></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="animate-fade-in">
            <form
              name="portfolio-contact"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl shadow-md p-6 border border-slate-200 dark:border-slate-700"
            >
              <input type="hidden" name="form-name" value="portfolio-contact" />

              {INPUT_FIELDS.map((field) => (
                <div key={field.id} className="mb-4">
                  <label
                    htmlFor={field.id}
                    className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    value={formData[field.id]}
                    onChange={handleChange}
                    required
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100"
                  />
                </div>
              ))}

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 mb-2 text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message here..."
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100 min-h-[120px] resize-y"
                ></textarea>
              </div>

              {status.message && (
                <div className="mb-4 p-3 rounded-lg text-sm font-medium bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-100">
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full px-6 py-3 bg-blue-600 text-slate-50 dark:bg-slate-100 dark:text-slate-900 rounded-lg hover:opacity-90 disabled:opacity-60 transition shadow-md font-medium"
              >
                {sending ? 'Sending Message...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
