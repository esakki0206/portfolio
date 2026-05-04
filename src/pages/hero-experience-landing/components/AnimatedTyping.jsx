import React, { useState, useEffect, useMemo } from 'react';

const AnimatedTyping = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Stable reference — defined outside state so useEffect deps are correct.
  const texts = useMemo(
    () => ['React', 'Python', 'Node.js', 'PHP', 'TensorFlow', 'Arduino', 'MySQL'],
    []
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      const current = texts[currentIndex];

      if (isDeleting) {
        const next = current.substring(0, currentText.length - 1);
        setCurrentText(next);
        if (next === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        const next = current.substring(0, currentText.length + 1);
        setCurrentText(next);
        if (next === current) {
          setIsPaused(true);
        }
      }
    }, isPaused ? 2000 : isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, texts]);

  return (
    <div className="flex items-center space-x-2">
      <span className="text-muted-foreground">Crafting with</span>
      <span className="text-accent font-mono font-semibold min-w-[130px] text-left">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default AnimatedTyping;
