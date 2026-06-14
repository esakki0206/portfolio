import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

// Fixed particle positions — computed once, no Math.random() inside render.
// Using useMemo with a seeded-style pattern so SSR/CSR results match.
const PARTICLE_CONFIG = [
  { x: 8, y: 22, size: 3, dur: 18, delay: 0 },
  { x: 25, y: 45, size: 4, dur: 22, delay: 3 },
  { x: 42, y: 15, size: 2, dur: 16, delay: 6 },
  { x: 58, y: 68, size: 3, dur: 20, delay: 1 },
  { x: 73, y: 30, size: 4, dur: 24, delay: 8 },
  { x: 88, y: 55, size: 2, dur: 18, delay: 4 },
  { x: 15, y: 78, size: 3, dur: 26, delay: 10 },
  { x: 65, y: 88, size: 2, dur: 14, delay: 5 },
];

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const navigate = useNavigate();

  const roles = useMemo(() => [
    'Computer Science Student',
    'Full-Stack Developer',
    'Problem Solver',
    'IoT Enthusiast',
    'ML Explorer',
  ], []);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentRole((prev) => (prev + 1) % roles.length),
      3000
    );
    return () => clearInterval(interval);
  }, [roles.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">

        {/* CSS-animated particles — no individual Framer Motion instances */}
        <style>{`
          @keyframes particleDrift {
            0%, 100% { transform: translateY(0px); opacity: 0.3; }
            50%       { transform: translateY(-20px); opacity: 0.8; }
          }
        `}</style>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {PARTICLE_CONFIG.map((p, i) => (
            <div
              key={i}
              className="absolute bg-accent/40 rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `particleDrift ${p.dur}s ease-in-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Constellation lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M100,200 Q300,100 500,300 T900,200"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.path
              d="M200,400 Q400,300 600,500 T1000,400"
              stroke="url(#lineGrad)"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, delay: 1, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* ── Left — Text ── */}
            <div className="text-center lg:text-left space-y-8">
              <motion.div variants={itemVariants}>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Welcome to my universe</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  <span className="text-foreground">Hi, I'm </span>
                  <span className="text-gradient">Esakkiappan</span>
                </h1>
                {/* Role rotator — single element, keyed on role for exit animation */}
                <div className="h-10 flex items-center justify-center lg:justify-start overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={currentRole}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                      className="text-xl lg:text-2xl font-semibold text-muted-foreground"
                    >
                      {roles[currentRole]}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p variants={itemVariants} className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Pursuing a B.Sc. Computer Science at St. Joseph's College (Autonomous) with a 8.5
                GPA. I build full-stack web apps, prototype IoT hardware, and train ML models —
                driven by a genuine love for building things that work.
              </motion.p>

              {/* Stats */}
              <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 py-4">
                {[
                  { value: '8.5', label: 'GPA', color: 'text-accent' },
                  { value: '9+', label: 'Projects', color: 'text-success' },
                  { value: '4', label: 'Wins', color: 'text-warning' },
                ].map(({ value, label, color }) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className={`text-2xl font-bold ${color}`}>{value}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <button
                  onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-accent text-background rounded-lg font-medium hover:bg-accent/90 transition-all duration-300 magnetic-button neon-glow-hover"
                >
                  <Icon name="MessageCircle" size={18} />
                  <span>Let's Connect</span>
                </button>
                <button
                  onClick={() => navigate('/projects')}
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-muted/10 transition-all duration-300 magnetic-button"
                >
                  <Icon name="Code2" size={18} />
                  <span>View Projects</span>
                </button>
              </motion.div>

              {/* Socials */}
              <motion.div
                variants={itemVariants}
                className="flex items-center space-x-4 justify-center lg:justify-start"
              >
                <span className="text-sm text-muted-foreground">Find me on:</span>
                {[
                  { href: 'https://www.linkedin.com/in/esakkiappan-e-b24893343', icon: 'Linkedin', label: 'LinkedIn' },
                  { href: 'https://github.com/Esakkiappan10', icon: 'Github', label: 'GitHub' },
                ].map(({ href, icon, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-muted/20 hover:bg-accent/20 border border-muted/30 hover:border-accent/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-accent transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon name={icon} size={18} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* ── Right — Profile Image ── */}
            <motion.div
              variants={imageVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-success/20 rounded-full blur-3xl scale-110" />
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-success/10 rounded-full" />
                  <div className="absolute inset-4 overflow-hidden rounded-full border-2 border-accent/30">
                    <Image
                      src="/assets/images/Profile_Photo.jpg"
                      alt="Esakkiappan — Computer Science Student"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-3 -right-3 w-12 h-12 sm:w-14 sm:h-14 bg-accent/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-accent/30"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon name="Code2" size={20} className="text-accent" />
                  </motion.div>
                  <motion.div
                    className="absolute -bottom-3 -left-3 w-12 h-12 sm:w-14 sm:h-14 bg-success/20 rounded-lg flex items-center justify-center backdrop-blur-sm border border-success/30"
                    animate={{ y: [5, -5, 5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon name="Lightbulb" size={20} className="text-success" />
                  </motion.div>
                  <motion.div
                    className="absolute top-1/2 -right-6 w-9 h-9 sm:w-10 sm:h-10 bg-warning/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-warning/30"
                    animate={{ x: [-3, 3, -3] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Icon name="Zap" size={14} className="text-warning" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── What I Do ──────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-center text-lg font-semibold text-foreground mb-6">What I Do</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {[
                { icon: 'Globe', title: 'Full-Stack Web', desc: 'React · PHP · MySQL' },
                { icon: 'Cpu', title: 'IoT Prototyping', desc: 'Arduino · ESP32-CAM' },
                { icon: 'Brain', title: 'Machine Learning', desc: 'TensorFlow · Keras · Python' },
                { icon: 'Award', title: 'Certifications', desc: 'NPTEL · Coursera' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="glass-card p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 bg-accent/15 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name={item.icon} size={18} className="text-accent" />
                  </div>
                  <div className="text-sm font-medium text-foreground">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Strength tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-8 flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {[
              { icon: 'Target', label: 'Problem Solver' },
              { icon: 'Layers', label: 'Clean Code' },
              { icon: 'Zap', label: 'Quick Learner' },
              { icon: 'Users', label: 'Team Player' },
              { icon: 'Trophy', label: '1st Rank Holder' },
            ].map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-muted/15 border border-border/50 rounded-full text-xs md:text-sm font-medium text-muted-foreground"
              >
                <Icon name={s.icon} size={14} className="text-accent" />
                <span>{s.label}</span>
              </span>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
