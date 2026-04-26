import React from 'react';
import AnimatedTyping from './AnimatedTyping';
import CTAButtons from './CTAButtons';

const HeroContent = () => {
  return (
    <div className="text-center space-y-8 max-w-4xl mx-auto px-6">
      {/* Main Headline */}
      <div className="space-y-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6l font-bold leading-tight">
          <span className="block text-gradient">Building Tomorrow's</span>
          <span className="block text-foreground">Digital Experiences</span>
          <span className="block text-accent">Today</span>
        </h1>
        
        <div className="flex justify-center mt-6">
          <AnimatedTyping />
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        Computer Science student passionate about creating innovative solutions that bridge 
        the gap between complex technology and intuitive user experiences.
      </p>

      {/* Quick Stats */}
      <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>5+ Projects Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span>6+ Years Coding Experience</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
          <span>Always Learning</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <CTAButtons />
    </div>
  );
};

export default HeroContent;