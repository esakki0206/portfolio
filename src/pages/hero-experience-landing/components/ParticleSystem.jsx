import React, { useRef, useEffect } from 'react';

const ParticleSystem = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x, y) => ({
      x: x || Math.random() * canvas?.width,
      y: y || Math.random() * canvas?.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? '#00F5FF' : '#10B981',
      life: 1,
      decay: Math.random() * 0.005 + 0.001
    });

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 50 : 100;
      for (let i = 0; i < particleCount; i++) {
        particles?.push(createParticle());
      }
      particlesRef.current = particles;
    };

    const updateParticles = () => {
      particles?.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef?.current?.x - particle?.x;
        const dy = mouseRef?.current?.y - particle?.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Update position
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Boundary check
        if (particle?.x < 0 || particle?.x > canvas?.width) particle.vx *= -1;
        if (particle?.y < 0 || particle?.y > canvas?.height) particle.vy *= -1;

        // Update life
        particle.life -= particle?.decay;
        if (particle?.life <= 0) {
          particles[index] = createParticle();
        }

        // Damping
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    };

    const drawParticles = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      particles?.forEach(particle => {
        ctx?.save();
        ctx.globalAlpha = particle?.opacity * particle?.life;
        ctx.fillStyle = particle?.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle?.color;
        
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      });

      // Draw connections
      particles?.forEach((particle, i) => {
        particles?.slice(i + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) {
            ctx?.save();
            ctx.globalAlpha = (80 - distance) / 80 * 0.2;
            ctx.strokeStyle = '#00F5FF';
            ctx.lineWidth = 0.5;
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx?.stroke();
            ctx?.restore();
          }
        });
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e?.clientX,
        y: e?.clientY
      };
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    // Initialize
    resizeCanvas();
    initParticles();
    animate();

    // Event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef?.current) {
        cancelAnimationFrame(animationRef?.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleSystem;