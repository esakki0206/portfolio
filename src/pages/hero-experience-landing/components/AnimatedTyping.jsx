import React, { useState, useEffect } from 'react';

const AnimatedTyping = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const texts = [
    'JavaScript',
    'Python',
    'React',
    'Node.js',
    'TypeScript',
    'Next.js'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      const current = texts?.[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current?.substring(0, currentText?.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts?.length);
        }
      } else {
        setCurrentText(current?.substring(0, currentText?.length + 1));
        
        if (currentText === current) {
          setIsPaused(true);
        }
      }
    }, isDeleting ? 50 : isPaused ? 2000 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, texts]);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-muted-foreground">Crafting with</span>
      <span className="text-accent font-mono font-semibold min-w-[120px] text-left">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default AnimatedTyping;