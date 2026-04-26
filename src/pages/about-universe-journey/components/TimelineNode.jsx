import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TimelineNode = ({ node, index, isActive, onToggle, side = 'left' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const nodeVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      x: side === 'left' ? -50 : 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      x: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -20
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  };

  return (
    <motion.div
      variants={nodeVariants}
      initial="hidden"
      animate="visible"
      className={`timeline-node relative ${side === 'left' ? 'text-right pr-8' : 'text-left pl-8'}`}
    >
      {/* Connection Line */}
      <div className={`absolute top-6 w-8 h-px bg-gradient-to-r from-accent/50 to-success/50 ${
        side === 'left' ? 'right-0' : 'left-0'
      }`} />
      {/* Node Circle */}
      <motion.button
        onClick={() => onToggle(node?.id)}
        className={`absolute top-4 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
          side === 'left' ? '-right-2' : '-left-2'
        } ${
          isActive 
            ? 'bg-accent border-accent shadow-lg shadow-accent/30 scale-125' 
            : 'bg-background border-muted-foreground/50 hover:border-accent hover:scale-110'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className={`absolute inset-0 rounded-full ${
          isActive ? 'animate-ping bg-accent/30' : ''
        }`} />
      </motion.button>
      {/* Content Card */}
      <motion.div
        className={`glass-card p-6 max-w-md cursor-pointer group ${
          side === 'left' ? 'mr-6' : 'ml-6'
        } ${isActive ? 'neon-glow' : 'hover:neon-glow-hover'}`}
        onClick={() => onToggle(node?.id)}
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <Icon 
                name={node?.icon} 
                size={18} 
                className="text-accent flex-shrink-0" 
              />
              <span className="text-xs font-medium text-accent uppercase tracking-wide">
                {node?.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
              {node?.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {node?.period}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Icon 
              name="ChevronDown" 
              size={16} 
              className="text-muted-foreground group-hover:text-accent transition-colors duration-200" 
            />
          </motion.div>
        </div>

        {/* Preview */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {node?.preview}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {node?.tags?.slice(0, 3)?.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md border border-accent/20"
            >
              {tag}
            </span>
          ))}
          {node?.tags?.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted/20 text-muted-foreground rounded-md">
              +{node?.tags?.length - 3}
            </span>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="border-t border-border pt-4 space-y-4"
            >
              {/* Full Description */}
              <div className="prose prose-sm prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {node?.fullDescription}
                </p>
              </div>

              {/* Media Content */}
              {node?.media && (
                <div className="space-y-3">
                  {node?.media?.image && (
                    <div className="relative overflow-hidden rounded-lg bg-muted/20">
                      <Image
                        src={node?.media?.image}
                        alt={node?.media?.imageAlt || node?.title}
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                        onLoad={() => setImageLoaded(true)}
                      />
                      {!imageLoaded && (
                        <div className="absolute inset-0 bg-muted/20 animate-pulse" />
                      )}
                    </div>
                  )}

                  {node?.media?.code && (
                    <div className="code-highlight">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground font-mono">
                          {node?.media?.codeLanguage || 'Code'}
                        </span>
                        <Icon name="Code2" size={14} className="text-accent" />
                      </div>
                      <pre className="text-xs text-foreground overflow-x-auto">
                        <code>{node?.media?.code}</code>
                      </pre>
                    </div>
                  )}

                  {node?.media?.achievement && (
                    <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                      <Icon name="Trophy" size={20} className="text-success" />
                      <div>
                        <p className="text-sm font-medium text-success">
                          {node?.media?.achievement}
                        </p>
                        {node?.media?.achievementDetails && (
                          <p className="text-xs text-muted-foreground">
                            {node?.media?.achievementDetails}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* All Tags */}
              <div className="flex flex-wrap gap-1">
                {node?.tags?.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {node?.links && node?.links?.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {node?.links?.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs text-accent hover:text-accent/80 transition-colors duration-200"
                    >
                      <Icon name={link?.icon || "ExternalLink"} size={12} />
                      <span>{link?.label}</span>
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TimelineNode;