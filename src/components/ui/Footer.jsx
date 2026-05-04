import React from 'react';
import Icon from '../AppIcon';

/**
 * Shared Footer — used across all pages so the markup stays DRY.
 * Props:
 *   variant  — "minimal" (just copyright) | "full" (logo + socials + copyright)
 *              Defaults to "full".
 */
const Footer = ({ variant = 'full' }) => {
  const year = new Date().getFullYear();

  const socials = [
    {
      href: 'https://www.linkedin.com/in/esakkiappan-e-b24893343',
      icon: 'Linkedin',
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/Esakkiappan10',
      icon: 'Github',
      label: 'GitHub',
    },
    {
      href: 'mailto:esakki0720@gmail.com',
      icon: 'Mail',
      label: 'Email',
    },
  ];

  if (variant === 'minimal') {
    return (
      <footer className="border-t border-border bg-card/50 py-6 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © {year} Esakkiappan E. Built with React, Tailwind CSS &amp; lots of ☕
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="py-12 px-6 lg:px-8 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo + tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center shrink-0">
              <span className="text-background font-bold text-xs">EA</span>
            </div>
            <div>
              <span className="text-foreground font-semibold block leading-tight">Esakkiappan E</span>
              <span className="text-xs text-muted-foreground">Full-Stack Developer · CS Student</span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex items-center space-x-3">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? '_self' : '_blank'}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-lg bg-muted/20 border border-border hover:bg-accent/10 hover:border-accent/40 flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-200"
              >
                <Icon name={icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {year} Esakkiappan E. Crafted with passion and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
