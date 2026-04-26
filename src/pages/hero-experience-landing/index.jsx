import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ParticleSystem from './components/ParticleSystem';
import HolographicAvatar from './components/HolographicAvatar';
import FloatingCodeSnippets from './components/FloatingCodeSnippets';
import HeroContent from './components/HeroContent';
import ScrollIndicator from './components/ScrollIndicator';

const HeroExperienceLanding = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time for smooth entrance animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>CodeSphere Portfolio - Building Tomorrow's Digital Experiences</title>
        <meta name="description" content="Computer Science student passionate about creating innovative solutions that bridge complex technology and intuitive user experiences." />
        <meta name="keywords" content="portfolio, computer science, web development, react, javascript, python, projects" />
        <meta property="og:title" content="CodeSphere Portfolio - Digital Innovation" />
        <meta property="og:description" content="Explore cutting-edge projects and technical expertise in modern web development." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-primary to-background relative overflow-hidden">
        {/* Header */}
        <Header />

        {/* Background Effects */}
        <ParticleSystem />
        <FloatingCodeSnippets />

        {/* Main Hero Section */}
        <main className="relative z-10 min-h-screen flex items-center justify-center pt-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className={`space-y-8 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <HeroContent />
              </div>

              {/* Right Column - Avatar */}
              <div className={`flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}>
                <HolographicAvatar />
              </div>
            </div>
          </div>
        </main>
      
      </div>
    </>
  );
};

export default HeroExperienceLanding;