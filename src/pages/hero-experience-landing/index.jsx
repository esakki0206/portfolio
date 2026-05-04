import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ParticleSystem from './components/ParticleSystem';
import HolographicAvatar from './components/HolographicAvatar';
import FloatingCodeSnippets from './components/FloatingCodeSnippets';
import HeroContent from './components/HeroContent';
import ScrollIndicator from './components/ScrollIndicator';

const HeroExperienceLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Esakkiappan E — Full-Stack Developer & CS Student</title>
        <meta
          name="description"
          content="Portfolio of Esakkiappan E — a Computer Science student and full-stack developer who builds real web apps, IoT prototypes, and ML models."
        />
        <meta
          name="keywords"
          content="Esakkiappan, portfolio, computer science, web development, react, javascript, python, IoT, machine learning"
        />
        <meta property="og:title" content="Esakkiappan E — Full-Stack Developer & CS Student" />
        <meta
          property="og:description"
          content="Explore real projects, skills, and achievements from my Computer Science journey."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary to-background relative overflow-hidden">
        <Header />

        {/* Background Effects — particle canvas is always rendered, floating
            code snippets hidden on xs screens to reduce visual noise on mobile */}
        <ParticleSystem />
        <div className="hidden sm:block">
          <FloatingCodeSnippets />
        </div>

        {/* Main Hero */}
        <main className="relative z-10 min-h-screen flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Content */}
              <div
                className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                <HeroContent />
              </div>

              {/* Right — Avatar (hidden on small phones, shown from sm+) */}
              <div
                className={`hidden sm:flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  }`}
              >
                <HolographicAvatar />
              </div>
            </div>
          </div>
        </main>

      </div>

      <Footer />
    </>
  );
};

export default HeroExperienceLanding;
