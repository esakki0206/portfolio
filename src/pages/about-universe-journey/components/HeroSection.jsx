import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [particles, setParticles] = useState([]);

  const roles = [
    'Computer Science Student',
    'Full-Stack Developer',
    'Problem Solver',
    'IoT Enthusiast',
    'ML Explorer',
  ];

  // Floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);
  }, []);

  // Rotate roles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Animated Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute bg-accent/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: particle.duration, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Constellation Lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <motion.path
            d="M100,200 Q300,100 500,300 T900,200"
            stroke="url(#lineGradient)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut' }}
          />
          <motion.path
            d="M200,400 Q400,300 600,500 T1000,400"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column */}
          <div className="text-center lg:text-left space-y-8">
            {/* Greeting Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                <Icon name="Sparkles" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">Welcome to my universe</span>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                <span className="text-foreground">Hi, I'm </span>
                <span className="text-gradient">Esakkiappan</span>
              </h1>

              <div className="h-16 flex items-center justify-center lg:justify-start">
                <motion.h2
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl lg:text-3xl font-semibold text-muted-foreground"
                >
                  {roles[currentRole]}
                </motion.h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants}>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Pursuing a B.Sc. Computer Science at St. Joseph's College (Autonomous) with a 8.5
                GPA. I build full-stack web apps, prototype IoT hardware, and train ML models —
                driven by a genuine love for building things that work.
              </p>
            </motion.div>

            {/* Real Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-accent">8.5</div>
                <div className="text-sm text-muted-foreground">GPA</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-success">3+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-warning">1</div>
                <div className="text-sm text-muted-foreground">Hackathon</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('contact-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 magnetic-button neon-glow-hover"
              >
                <Icon name="MessageCircle" size={18} />
                <span>Let's Connect</span>
              </button>
              <a
                href="/projects"
                className="inline-flex items-center space-x-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted/10 transition-all duration-300 magnetic-button"
              >
                <Icon name="Code2" size={18} />
                <span>View Projects</span>
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-4 justify-center lg:justify-start"
            >
              <span className="text-sm text-muted-foreground">Find me on:</span>
              <motion.a
                href="https://www.linkedin.com/in/esakkiappan-e-b24893343"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted/20 hover:bg-accent/20 border border-muted/30 hover:border-accent/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="LinkedIn"
              >
                <Icon name="Linkedin" size={18} />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted/20 hover:bg-accent/20 border border-muted/30 hover:border-accent/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="GitHub"
              >
                <Icon name="Github" size={18} />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column — Profile Image */}
          <motion.div
            variants={imageVariants}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-3xl scale-110"></div>

              {/* Image Container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-success/10 rounded-full"></div>
                <div className="absolute inset-4 overflow-hidden rounded-full border-2 border-accent/30">
                  <Image
                    src="/assets/images/Profile_Photo.jpg"
                    alt="Esakkiappan — Computer Science Student"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Badges */}
                <motion.div
                  className="absolute -top-4 -right-4 w-14 h-14 sm:w-16 sm:h-16 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/30"
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon name="Code2" size={22} className="text-accent" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 w-14 h-14 sm:w-16 sm:h-16 bg-success/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-success/30"
                  animate={{ y: [5, -5, 5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon name="Lightbulb" size={22} className="text-success" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 -right-8 w-10 h-10 sm:w-12 sm:h-12 bg-warning/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-warning/30"
                  animate={{ x: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Icon name="Zap" size={16} className="text-warning" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex flex-col items-center space-y-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <Icon name="ChevronDown" size={20} />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
