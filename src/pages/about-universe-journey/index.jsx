import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import PhilosophySection from './components/PhilosophySection';
import ContactSection from './components/ContactSection';

const AboutUniverseJourney = () => {
  useEffect(() => {
    document.title = "About — Esakkiappan's Portfolio";
    window.scrollTo(0, 0);
  }, []);

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-background text-foreground"
    >
      <Header />

      <main className="pt-16">
        {/* Who I am + profile image */}
        <HeroSection />

        {/* Career timeline */}
        <TimelineSection />

        {/* Technical philosophy */}
        <PhilosophySection />

        {/* Contact links */}
        <ContactSection />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold text-xs">EA</span>
                </div>
                <span className="text-lg font-semibold text-foreground">Esakkiappan E</span>
              </div>
              <p className="text-muted-foreground max-w-md mx-auto">
                Building tomorrow's digital experiences through code, creativity, and continuous
                learning.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                <span>Computer Science Student</span>
                <span className="hidden sm:inline">•</span>
                <span>Full-Stack Developer</span>
                <span className="hidden sm:inline">•</span>
                <span>Problem Solver</span>
              </div>
              <div className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Esakkiappan E. Crafted with passion and
                  precision.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};

export default AboutUniverseJourney;
