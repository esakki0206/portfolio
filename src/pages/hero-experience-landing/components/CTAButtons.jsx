import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const CTAButtons = () => {
  const navigate = useNavigate();

  const handleExploreProjects = () => {
    navigate('/project-laboratory-showcase');
  };

  const handleViewResume = () => {
    // Mock resume download
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Mock Resume Content - This would be a real PDF in production';
    link.download = 'Esakkiappan_Resume.txt';
    link?.click();
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
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
        onClick={handleViewResume}
        iconName="Download"
        iconPosition="left"
        className="magnetic-button min-w-[200px] border-accent text-accent hover:bg-accent/10 hover:border-accent/80"
      >
        View Resume
      </Button>
    </div>
  );
};

export default CTAButtons;