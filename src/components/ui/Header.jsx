import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Icon from '../AppIcon';

const NAVIGATION_ITEMS = [
  { name: 'Home',         path: '/',            icon: 'Home'    },
  { name: 'Projects',     path: '/projects',    icon: 'Code2'   },
  { name: 'Skills',       path: '/skills',      icon: 'Zap'     },
  { name: 'About',        path: '/about',       icon: 'User'    },
  { name: 'Achievements', path: '/achievements',icon: 'Trophy'  },
];

const Header = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll → frosted header
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  }, [navigate]);

  const isActivePath = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname === path;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/85 backdrop-blur-glass border-b border-border shadow-elevation-2'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* ── Logo ── */}
            <button
              className="flex items-center group"
              onClick={() => handleNavigation('/')}
              aria-label="Go to home"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                  <img
                    src="/assets/images/Profile_Photo.jpg"
                    alt="Esakkiappan"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-accent to-success rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300" />
              </div>
              <div className="ml-3">
                <span className="text-xl font-bold text-gradient block">Esakkiappan</span>
                <span className="text-xs text-muted-foreground block -mt-1">Portfolio</span>
              </div>
            </button>

            {/* ── Desktop Nav ── */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  aria-current={isActivePath(item.path) ? 'page' : undefined}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isActivePath(item.path)
                      ? 'text-accent bg-accent/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={item.icon} size={16} />
                    <span>{item.name}</span>
                  </div>
                  {isActivePath(item.path) && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* ── Desktop CTA ── */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')}
                iconName="Linkedin"
                iconPosition="left"
                className="magnetic-button"
              >
                LinkedIn
              </Button>
            </div>

            {/* ── Mobile Hamburger ── */}
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu + Backdrop (rendered outside header so backdrop covers full page) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-card border-l border-border shadow-elevation-3 lg:hidden flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border shrink-0">
                <span className="font-semibold text-foreground">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    aria-current={isActivePath(item.path) ? 'page' : undefined}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.name}</span>
                    {isActivePath(item.path) && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />
                    )}
                  </button>
                ))}
              </nav>

              {/* LinkedIn CTA */}
              <div className="px-4 py-4 border-t border-border shrink-0">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank');
                    setIsMobileMenuOpen(false);
                  }}
                  iconName="Linkedin"
                  iconPosition="left"
                >
                  LinkedIn Profile
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
