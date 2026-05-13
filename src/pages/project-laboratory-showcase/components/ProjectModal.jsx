import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab('overview');
    }
  }, [isOpen, project]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    ...(project?.demoUrl ? [{ id: 'demo', label: 'Live', icon: 'Play' }] : [])
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
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-4xl max-h-[90vh] bg-card border border-border rounded-xl shadow-elevation-3 overflow-hidden flex flex-col"
            onClick={(e) => e?.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                  <Icon name="Code2" size={24} className="text-background" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{project?.title}</h2>
                  <p className="text-muted-foreground">{project?.category}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                className="hover:bg-muted/50"
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 ${activeTab === tab?.id
                    ? 'text-accent border-b-2 border-accent bg-accent/5' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                    }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto custom-scrollbar flex-grow">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-64 object-cover rounded-lg border border-white/5"
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
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="space-y-6">
                  <div className="bg-muted/20 rounded-lg p-12 text-center border border-white/5">
                    <Icon name="Play" size={64} className="text-accent mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-foreground mb-3">Ready to explore?</h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Experience the live production build of {project.title}.
                    </p>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => window.open(project?.demoUrl, '_blank')}
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="neon-glow-hover"
                    >
                      Launch Live
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-4 w-full">
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