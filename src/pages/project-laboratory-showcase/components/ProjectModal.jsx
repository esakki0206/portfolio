import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Reset tab on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, project]);

  // Escape key handler (WCAG 2.1 compliance)
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    ...(project?.demoUrl ? [{ id: 'demo', label: 'Live Demo', icon: 'Play' }] : [])
  ];

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-lg"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details: ${project?.title}`}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-xl shadow-elevation-3 overflow-hidden flex flex-col"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <div className="flex items-center space-x-3 sm:space-x-4 min-w-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Code2" size={20} className="text-background sm:hidden" />
                  <Icon name="Code2" size={24} className="text-background hidden sm:block" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-2xl font-bold text-foreground truncate">{project?.title}</h2>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground truncate">{project?.category}</p>
                    {project?.year && (
                      <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-md flex-shrink-0">
                        {project.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                className="hover:bg-muted/50 flex-shrink-0"
                aria-label="Close modal"
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab?.id
                    ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-grow">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-48 sm:h-64 object-cover rounded-lg border border-white/5"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">About the Project</h3>
                        <p className="text-muted-foreground leading-relaxed">{project?.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                          {project?.techStack?.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm font-medium bg-accent/10 text-accent rounded-md border border-accent/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {project?.features?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 bg-muted/20 p-3 rounded-lg border border-white/5">
                          <Icon name="CheckCircle" size={18} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="space-y-6">
                  {/* Live preview iframe */}
                  <div className="relative w-full aspect-video bg-muted/20 rounded-lg border border-white/5 overflow-hidden">
                    <iframe
                      src={project?.demoUrl}
                      title={`Live preview of ${project?.title}`}
                      className="w-full h-full border-0"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      loading="lazy"
                    />
                    {/* Overlay gradient at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  </div>

                  {/* Action row */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => window.open(project?.demoUrl, '_blank')}
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="neon-glow-hover w-full sm:w-auto"
                    >
                      Open in New Tab
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">
                      Interactive preview — some sites may block iframe embedding
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-3 sm:space-x-4 w-full flex-wrap gap-y-2">
                {/* GitHub private notice */}
                {!project?.githubUrl && project?.githubNote && (
                  <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted/30 rounded-lg border border-border/50 text-sm text-muted-foreground">
                    <Icon name="Lock" size={14} className="text-warning flex-shrink-0" />
                    <span className="truncate">{project.githubNote}</span>
                  </div>
                )}

                {/* GitHub link (shown only if URL exists) */}
                {project?.githubUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(project?.githubUrl, '_blank')}
                    iconName="Github"
                    iconPosition="left"
                    className="flex-1 sm:flex-none"
                  >
                    View Source
                  </Button>
                )}

                {/* Demo link */}
                {project?.demoUrl && (
                  <Button
                    variant="default"
                    onClick={() => window.open(project?.demoUrl, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                    className="flex-1 sm:flex-none neon-glow-hover ml-auto"
                  >
                    Live
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;