import React, { useRef, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const HolographicAvatar = () => {
  const avatarRef = useRef(null);
  const orbitRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const isVisibleRef = useRef(true);

  const techIcons = [
    { name: 'Code2', angle: 0, radius: 80, color: '#00F5FF' },
    { name: 'Database', angle: 60, radius: 80, color: '#10B981' },
    { name: 'Globe', angle: 120, radius: 80, color: '#F59E0B' },
    { name: 'Zap', angle: 180, radius: 80, color: '#EF4444' },
    { name: 'Cpu', angle: 240, radius: 80, color: '#8B5CF6' },
    { name: 'Smartphone', angle: 300, radius: 80, color: '#EC4899' }
  ];

  // Fixed particle positions — no Math.random() in render
  const particles = useMemo(() => [
    { left: '25%', top: '30%', delay: '0s', dur: '2s' },
    { left: '70%', top: '20%', delay: '0.5s', dur: '2.5s' },
    { left: '40%', top: '65%', delay: '1s', dur: '3s' },
    { left: '60%', top: '75%', delay: '1.5s', dur: '2s' },
    { left: '20%', top: '55%', delay: '0.3s', dur: '2.8s' },
    { left: '80%', top: '45%', delay: '0.8s', dur: '2.2s' },
    { left: '50%', top: '85%', delay: '1.2s', dur: '3.2s' },
    { left: '30%', top: '40%', delay: '0.6s', dur: '2.6s' },
  ], []);

  useEffect(() => {
    let startTime = Date.now();

    const animate = () => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = (Date.now() - startTime) / 1000;
      
      if (avatarRef.current) {
        avatarRef.current.style.transform = `rotateY(${elapsed * 20}deg) rotateX(${Math.sin(elapsed * 0.5) * 5}deg)`;
      }

      if (orbitRef.current) {
        const icons = orbitRef.current.children;
        Array.from(icons).forEach((icon, index) => {
          const baseAngle = techIcons[index].angle;
          const currentAngle = baseAngle + elapsed * 30;
          const x = Math.cos((currentAngle * Math.PI) / 180) * techIcons[index].radius;
          const y = Math.sin((currentAngle * Math.PI) / 180) * techIcons[index].radius;
          icon.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(elapsed * 2 + index) * 0.1})`;
        });
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => { isVisibleRef.current = entries[0].isIntersecting; },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
      {/* Central Avatar */}
      <div
        ref={avatarRef}
        className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-accent/20 to-success/20 border-2 border-accent/30 backdrop-blur-sm flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), inset 0 0 40px rgba(0, 245, 255, 0.1)'
        }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-accent to-success flex items-center justify-center">
          <Icon name="User" size={32} className="text-background" />
        </div>
        {/* Holographic rings */}
        <div className="absolute inset-0 rounded-full border border-accent/20 animate-pulse"></div>
        <div className="absolute inset-[-10px] rounded-full border border-success/10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-[-20px] rounded-full border border-accent/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Orbiting Tech Icons */}
      <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center">
        {techIcons.map((tech) => (
          <div
            key={tech.name}
            className="absolute w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-125"
            style={{
              background: `linear-gradient(135deg, ${tech.color}20, ${tech.color}10)`,
              boxShadow: `0 0 20px ${tech.color}40`
            }}
          >
            <Icon name={tech.name} size={18} style={{ color: tech.color }} />
          </div>
        ))}
      </div>

      {/* Fixed particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60 animate-pulse"
            style={{ left: p.left, top: p.top, animationDelay: p.delay, animationDuration: p.dur }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicAvatar;