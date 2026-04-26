import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col h-full"
    >
      <div className="glass-card flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 border border-white/5 backdrop-blur-md">
        
        {/* Project Image Area */}
        <div className="relative overflow-hidden h-56 bg-muted/20 border-b border-white/5">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3 z-10">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-background/80 backdrop-blur-md text-success shadow-lg border border-success/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              <span>{project?.status}</span>
            </div>
          </div>

          {/* Hover Overlay Gradient (Subtle) */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
              {project?.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {project?.description}
            </p>
          </div>

          {/* Key Features (Bullet Points) */}
          <div className="mb-6 flex-grow">
            <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3 flex items-center">
              <Icon name="Sparkles" size={14} className="mr-1.5 text-accent" />
              Key Features
            </h4>
            <ul className="space-y-2">
              {project?.features?.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-start text-sm text-muted-foreground">
                  <Icon name="CheckCircle2" size={16} className="mr-2 text-success shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project?.techStack?.slice(0, 4)?.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent rounded-md border border-accent/20"
              >
                {tech}
              </span>
            ))}
            {project?.techStack?.length > 4 && (
              <span className="px-2.5 py-1 text-xs font-medium bg-muted/30 text-muted-foreground rounded-md border border-white/5">
                +{project?.techStack?.length - 4}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-4 border-t border-white/5">
            {project?.demoUrl && (
              <Button
                variant="default"
                size="sm"
                onClick={() => window.open(project.demoUrl, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                className="flex-1 neon-glow-hover w-full"
              >
                Live Demo
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(project)}
              iconName="Info"
              iconPosition="left"
              className="flex-1 w-full hover:bg-white/5"
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