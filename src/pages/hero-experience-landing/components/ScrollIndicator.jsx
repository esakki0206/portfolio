import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsVisible(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce-slow">
      <button
        onClick={scrollToNext}
        className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-accent transition-colors duration-300 group"
        aria-label="Scroll to explore more"
      >
        <span className="text-sm font-medium opacity-80 group-hover:opacity-100">
          Explore More
        </span>
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center relative">
          <div className="w-1 h-3 bg-current rounded-full mt-2 animate-pulse"></div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className="animate-bounce group-hover:text-accent transition-colors duration-300" 
        />
      </button>
    </div>
  );
};

export default ScrollIndicator;