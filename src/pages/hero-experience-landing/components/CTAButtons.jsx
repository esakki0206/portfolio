import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CTAButtons = () => {
  const navigate = useNavigate();

  const handleExploreProjects = () => {
    navigate('/projects');
  };

  const handleContact = () => {
    navigate('/about');
    // After navigation, scroll to contact section
    setTimeout(() => {
      const contactEl = document.getElementById('contact-section');
      if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
      <Button
        variant="default"
        size="lg"
        onClick={handleExploreProjects}
        iconName="Code2"
        iconPosition="left"
        className="magnetic-button neon-glow-hover min-w-[200px] bg-gradient-to-r from-accent to-success hover:from-accent/90 hover:to-success/90 text-background font-semibold"
      >
        Explore Projects
      </Button>

      <Button
        variant="outline"
        size="lg"
        onClick={handleContact}
        iconName="MessageCircle"
        iconPosition="left"
        className="magnetic-button min-w-[200px] border-accent text-accent hover:bg-accent/10 hover:border-accent/80"
      >
        Get In Touch
      </Button>
    </div>
  );
};

export default CTAButtons;
