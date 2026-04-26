import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Home', path: '/hero-experience-landing', icon: 'Home' },
    { name: 'Projects', path: '/project-laboratory-showcase', icon: 'Code2' },
    { name: 'Skills', path: '/skills-observatory-visualization', icon: 'Zap' },
    { name: 'About', path: '/about-universe-journey', icon: 'User' },
    { name: 'Playground', path: '/code-playground-interactive', icon: 'Play' }
  ];

  const secondaryItems = [
    { name: 'Achievements', path: '/achievement-gallery-timeline', icon: 'Trophy' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-glass border-b border-border shadow-elevation-2' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => handleNavigation('/hero-experience-landing')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <img
  src="/assets/images/Profile_Photo.jpg"
  alt="Custom Icon"
  className="w-12 h-10"
/>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-accent to-success rounded-lg opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gradient">Esakkiappan</h1>
              <p className="text-xs text-muted-foreground -mt-1">Portfolio</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                  isActivePath(item?.path)
                    ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.name}</span>
                </div>
                {isActivePath(item?.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full"></div>
                )}
              </button>
            ))}

            {/* More Menu */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300">
                <div className="flex items-center space-x-2">
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </div>
              </button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-elevation-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {secondaryItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      isActivePath(item?.path)
                        ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('https://github.com', '_blank')}
              iconName="Github"
              iconPosition="left"
              className="magnetic-button"
            >
              GitHub
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-glass border-b border-border shadow-elevation-3">
            <nav className="px-6 py-4 space-y-2">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </button>
              ))}
              
              <div className="pt-4 border-t border-border space-y-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => window.open('https://github.com', '_blank')}
                  iconName="Github"
                  iconPosition="left"
                >
                  GitHub Profile
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;