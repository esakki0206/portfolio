import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/', icon: 'Home' },
    { name: 'Projects', path: '/projects', icon: 'Code2' },
    { name: 'Skills', path: '/skills', icon: 'Zap' },
    { name: 'About', path: '/about', icon: 'User' },
    { name: 'Achievements', path: '/achievements', icon: 'Trophy' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/85 backdrop-blur-glass border-b border-border shadow-elevation-2'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            className="flex items-center cursor-pointer group"
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
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-success rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-gradient block">Esakkiappan</span>
              <span className="text-xs text-muted-foreground block -mt-1">Portfolio</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item.path)
                    ? 'text-accent bg-accent/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                aria-current={isActivePath(item.path) ? 'page' : undefined}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item.icon} size={16} />
                  <span>{item.name}</span>
                </div>
                {isActivePath(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-glass border-b border-border shadow-elevation-3"
            >
              <nav className="px-6 py-4 space-y-1" role="navigation">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'text-accent bg-accent/10'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    aria-current={isActivePath(item.path) ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={18} />
                    <span>{item.name}</span>
                  </button>
                ))}
                <div className="pt-3 border-t border-border space-y-2">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')}
                    iconName="Linkedin"
                    iconPosition="left"
                  >
                    LinkedIn Profile
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
