import React, { useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const HolographicAvatar = () => {
  const avatarRef = useRef(null);
  const orbitRef = useRef(null);

  const techIcons = [
    { name: 'Code2', angle: 0, radius: 80, color: '#00F5FF' },
    { name: 'Database', angle: 60, radius: 80, color: '#10B981' },
    { name: 'Globe', angle: 120, radius: 80, color: '#F59E0B' },
    { name: 'Zap', angle: 180, radius: 80, color: '#EF4444' },
    { name: 'Cpu', angle: 240, radius: 80, color: '#8B5CF6' },
    { name: 'Smartphone', angle: 300, radius: 80, color: '#EC4899' }
  ];

  useEffect(() => {
    let animationId;
    let startTime = Date.now();

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      
      if (avatarRef?.current) {
        avatarRef.current.style.transform = `rotateY(${elapsed * 20}deg) rotateX(${Math.sin(elapsed * 0.5) * 5}deg)`;
      }

      if (orbitRef?.current) {
        const icons = orbitRef?.current?.children;
        Array.from(icons)?.forEach((icon, index) => {
          const baseAngle = techIcons?.[index]?.angle;
          const currentAngle = baseAngle + elapsed * 30;
          const x = Math.cos((currentAngle * Math.PI) / 180) * techIcons?.[index]?.radius;
          const y = Math.sin((currentAngle * Math.PI) / 180) * techIcons?.[index]?.radius;
          
          icon.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(elapsed * 2 + index) * 0.1})`;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-80 h-80 lg:w-96 lg:h-96">
      {/* Central Avatar */}
      <div
        ref={avatarRef}
        className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gradient-to-br from-accent/20 to-success/20 border-2 border-accent/30 backdrop-blur-sm flex items-center justify-center"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.3), inset 0 0 40px rgba(0, 245, 255, 0.1)'
        }}
      >
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-accent to-success flex items-center justify-center">
          <Icon name="User" size={32} className="text-background" />
        </div>
        
        {/* Holographic rings */}
        <div className="absolute inset-0 rounded-full border border-accent/20 animate-pulse"></div>
        <div className="absolute inset-[-10px] rounded-full border border-success/10 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute inset-[-20px] rounded-full border border-accent/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      {/* Orbiting Tech Icons */}
      <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center">
        {techIcons?.map((tech, index) => (
          <div
            key={tech?.name}
            className="absolute w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-125"
            style={{
              background: `linear-gradient(135deg, ${tech?.color}20, ${tech?.color}10)`,
              boxShadow: `0 0 20px ${tech?.color}40`
            }}
          >
            <Icon name={tech?.name} size={20} style={{ color: tech?.color }} />
          </div>
        ))}
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)]?.map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-accent rounded-full opacity-60 animate-pulse"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HolographicAvatar;