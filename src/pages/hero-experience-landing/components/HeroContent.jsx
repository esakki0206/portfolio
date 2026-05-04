import React from 'react';
import AnimatedTyping from './AnimatedTyping';
import CTAButtons from './CTAButtons';
import Icon from '../../../components/AppIcon';

const HeroContent = () => {
  return (
    <div className="space-y-8 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
      {/* Badge */}
      <div className="flex justify-center lg:justify-start">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-sm font-medium text-accent">Open to opportunities</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
          <span className="block text-gradient">Building Tomorrow's</span>
          <span className="block text-foreground">Digital Experiences</span>
          <span className="block text-accent">Today</span>
        </h1>

        <div className="flex justify-center lg:justify-start mt-6">
          <AnimatedTyping />
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
        Computer Science student at St. Joseph's College, passionate about creating innovative
        solutions that bridge the gap between complex technology and intuitive user experiences.
      </p>

      {/* Quick Stats — updated to match actual project count */}
      <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-8 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span>8+ Real-World Projects</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span>8.5 GPA</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-warning rounded-full animate-pulse" />
          <span>Hackathon Winner</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-center lg:justify-start">
        <CTAButtons />
      </div>

      {/* Resume Download */}
      <div className="flex justify-center lg:justify-start">
        <a
          href="/Esakkiappan__Resume_2026.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-200 group"
        >
          <Icon name="FileDown" size={16} className="group-hover:text-accent transition-colors duration-200" />
          <span className="underline underline-offset-4 decoration-muted-foreground/40 group-hover:decoration-accent">
            Download Resume
          </span>
        </a>
      </div>
    </div>
  );
};

export default HeroContent;
