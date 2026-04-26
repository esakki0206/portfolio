import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [copiedCode, setCopiedCode] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'demo', label: 'Live Demo', icon: 'Play' },
    { id: 'code', label: 'Code Snippets', icon: 'Code2' },
    { id: 'architecture', label: 'Architecture', icon: 'GitBranch' }
  ];

  const handleCopyCode = (code, snippetId) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(snippetId);
    setTimeout(() => setCopiedCode(''), 2000);
  };

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
            className="w-full max-w-6xl max-h-[90vh] bg-card border border-border rounded-xl shadow-elevation-3 overflow-hidden"
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
                  className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'text-accent border-b-2 border-accent bg-accent/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/30'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Problem Statement</h3>
                        <p className="text-muted-foreground">{project?.problemStatement}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Solution</h3>
                        <p className="text-muted-foreground">{project?.solution}</p>
                      </div>
                    </div>
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

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2">
                      {project?.features?.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Icon name="CheckCircle" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'demo' && (
                <div className="space-y-6">
                  <div className="bg-muted/20 rounded-lg p-8 text-center">
                    <Icon name="Play" size={48} className="text-accent mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">Live Demo</h3>
                    <p className="text-muted-foreground mb-4">Experience the project in action</p>
                    <Button
                      variant="default"
                      onClick={() => window.open(project?.demoUrl, '_blank')}
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="neon-glow-hover"
                    >
                      Open Live Demo
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Performance Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Load Time</span>
                          <span className="text-success">1.2s</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Lighthouse Score</span>
                          <span className="text-success">95/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Bundle Size</span>
                          <span className="text-accent">245KB</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Deployment Info</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Platform</span>
                          <span className="text-foreground">Vercel</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Deploy</span>
                          <span className="text-foreground">2 days ago</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status</span>
                          <span className="text-success">Active</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-6">
                  {project?.codeSnippets?.map((snippet, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">{snippet?.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyCode(snippet?.code, snippet?.id)}
                          iconName={copiedCode === snippet?.id ? "Check" : "Copy"}
                          iconPosition="left"
                          className="text-xs"
                        >
                          {copiedCode === snippet?.id ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                      <div className="code-highlight">
                        <pre className="text-sm text-foreground overflow-x-auto">
                          <code>{snippet?.code}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">System Architecture</h3>
                    <div className="bg-muted/20 rounded-lg p-6">
                      <div className="text-center text-muted-foreground">
                        <Icon name="GitBranch" size={48} className="mx-auto mb-4" />
                        <p>Architecture diagram would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Lessons Learned</h3>
                    <div className="space-y-3">
                      {project?.lessonsLearned?.map((lesson, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-muted/20 rounded-lg">
                          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{lesson}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => window.open(project?.githubUrl, '_blank')}
                  iconName="Github"
                  iconPosition="left"
                >
                  View on GitHub
                </Button>
                {project?.demoUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(project?.demoUrl, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
              <Button
                variant="default"
                iconName="MessageCircle"
                iconPosition="left"
                className="neon-glow-hover"
              >
                Request Project Details
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;