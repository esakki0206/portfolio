import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import PhilosophySection from './components/PhilosophySection';
import ContactSection from './components/ContactSection';

const AboutUniverseJourney = () => {
  useEffect(() => {
    document.title = "About — Esakkiappan's Portfolio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="min-h-screen bg-background text-foreground"
    >
      <Header />

      <main className="pt-16">
        <HeroSection />
        <TimelineSection />
        <PhilosophySection />
        <ContactSection />
      </main>

      <Footer />
    </motion.div>
  );
};

export default AboutUniverseJourney;
