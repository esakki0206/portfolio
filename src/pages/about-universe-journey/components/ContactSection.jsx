import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EMAIL_ADDRESS = 'esakki0720@gmail.com';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

const ContactSection = () => {
  const [copied, setCopied] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | success | error
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  /**
   * Copies email to clipboard and shows "Copied!" toast for 2 seconds.
   */
  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = EMAIL_ADDRESS;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  /**
   * Handles form input changes.
   */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  /**
   * Submits the contact form to Formspree.
   */
  const handleFormSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    setFormStatus('submitting');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 4000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  }, [formData]);

  const contactLinks = [
    {
      label: 'LinkedIn',
      value: 'esakkiappan-e-b24893343',
      href: 'https://www.linkedin.com/in/esakkiappan-e-b24893343',
      icon: 'Linkedin',
      description: 'Connect professionally',
      color: 'from-blue-600 to-blue-400',
    },
    {
      label: 'Email',
      value: EMAIL_ADDRESS,
      href: `mailto:${EMAIL_ADDRESS}`,
      icon: 'Mail',
      description: 'Send a message',
      color: 'from-accent to-success',
    },
    {
      label: 'GitHub',
      value: 'github.com/Esakkiappan10',
      href: 'https://github.com/Esakkiappan10',
      icon: 'Github',
      description: 'View my code',
      color: 'from-slate-600 to-slate-400',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="contact-section"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className="py-20 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Icon name="MessageCircle" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Get In Touch</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">Let's Connect</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Whether you have a project idea, an opportunity, or just want to say hello — I'm
            always happy to connect.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group glass-card p-5 sm:p-6 flex flex-col items-center text-center space-y-3 hover:border-accent/40 transition-all duration-300"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={link.icon} size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{link.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{link.description}</p>
              </div>
              <div className="flex items-center space-x-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="ExternalLink" size={12} />
                <span>Open</span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Copy Email Button */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <button
            onClick={handleCopyEmail}
            className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              copied
                ? 'bg-success/20 text-success border border-success/30'
                : 'bg-muted/20 text-muted-foreground border border-border hover:text-accent hover:border-accent/30 hover:bg-accent/10'
            }`}
            id="copy-email-button"
            aria-label="Copy email address to clipboard"
          >
            <Icon name={copied ? 'Check' : 'Copy'} size={16} />
            <span>{copied ? 'Copied to clipboard!' : `Copy email: ${EMAIL_ADDRESS}`}</span>
          </button>
        </motion.div>

        {/* ── Contact Form ─────────────────────────────────────────────── */}
        <motion.div variants={itemVariants} className="glass-card p-6 sm:p-8 mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Icon name="Send" size={18} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Send a Message</h3>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5" id="contact-form">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Name */}
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 text-sm"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Your message..."
                className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-200 text-sm resize-none"
              />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <Button
                variant="default"
                type="submit"
                iconName={formStatus === 'submitting' ? 'Loader2' : 'Send'}
                iconPosition="right"
                className="neon-glow-hover min-w-[160px]"
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </Button>

              {/* Status feedback */}
              {formStatus === 'success' && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-1.5 text-sm text-success"
                >
                  <Icon name="CheckCircle" size={16} />
                  <span>Message sent successfully!</span>
                </motion.span>
              )}
              {formStatus === 'error' && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-1.5 text-sm text-error"
                >
                  <Icon name="AlertCircle" size={16} />
                  <span>Failed to send. Try emailing directly.</span>
                </motion.span>
              )}
            </div>
          </form>
        </motion.div>

        {/* Availability Badge */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 bg-success/10 border border-success/20 rounded-full">
            <span className="w-2.5 h-2.5 bg-success rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-success">
              Currently open to internship and collaboration opportunities
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
