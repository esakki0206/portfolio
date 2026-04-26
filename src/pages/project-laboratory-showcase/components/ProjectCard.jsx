import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getComplexityColor = (level) => {
    switch (level) {
      case 'Beginner': return 'text-success bg-success/10 border-success/20';
      case 'Intermediate': return 'text-warning bg-warning/10 border-warning/20';
      case 'Advanced': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Live': return 'text-success';
      case 'Development': return 'text-warning';
      case 'Maintenance': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="glass-card p-6 h-full transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 interactive-lift">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-lg mb-4 h-48 bg-muted/20">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay with metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center"
          >
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-accent">{project?.metrics?.linesOfCode}</div>
                <div className="text-xs text-muted-foreground">Lines of Code</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-success">{project?.metrics?.githubStars}</div>
                <div className="text-xs text-muted-foreground">GitHub Stars</div>
              </div>
            </div>
          </motion.div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-background/80 backdrop-blur-sm ${getStatusColor(project?.status)}`}>
              <div className={`w-2 h-2 rounded-full ${project?.status === 'Live' ? 'bg-success' : project?.status === 'Development' ? 'bg-warning' : 'bg-accent'}`}></div>
              <span>{project?.status}</span>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
              {project?.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-3">
              {project?.description}
            </p>
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project?.techStack?.slice(0, 4)?.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md border border-accent/20"
              >
                {tech}
              </span>
            ))}
            {project?.techStack?.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-muted/20 text-muted-foreground rounded-md">
                +{project?.techStack?.length - 4} more
              </span>
            )}
          </div>

          {/* Complexity & Collaboration */}
          <div className="flex items-center justify-between">
            <div className={`px-2 py-1 text-xs font-medium rounded-md border ${getComplexityColor(project?.complexity)}`}>
              {project?.complexity}
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{project?.collaborationStatus}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(project?.githubUrl, '_blank')}
              iconName="Github"
              iconPosition="left"
              className="flex-1"
            >
              Code
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => onViewDetails(project)}
              iconName="ExternalLink"
              iconPosition="right"
              className="flex-1 neon-glow-hover"
            >
              Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;