import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ContactSection = () => {
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
      value: 'esakkiappan.e@example.com',
      href: 'mailto:esakkiappan.e@example.com',
      icon: 'Mail',
      description: 'Send a message',
      color: 'from-accent to-success',
    },
    {
      label: 'GitHub',
      value: 'github.com',
      href: 'https://github.com',
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
        <motion.div variants={itemVariants} className="grid sm:grid-cols-3 gap-6 mb-12">
          {contactLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="group glass-card p-6 flex flex-col items-center text-center space-y-3 hover:border-accent/40 transition-all duration-300"
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`w-14 h-14 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon name={link.icon} size={24} className="text-white" />
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
