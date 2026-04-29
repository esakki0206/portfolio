import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

/**
 * TimelineNode — A single milestone on the journey timeline.
 *
 * Layout strategy:
 *   Mobile  (<md): line is on the left, ALL cards sit to the right.
 *   Desktop (md+): line is centred, cards alternate left / right.
 */
const TimelineNode = ({ node, index, isActive, onToggle, side = 'left' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const nodeVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.08, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, height: 0, y: -10 },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  /*
   * Desktop grid: each row is 3 columns → [content] [dot] [content]
   * 'left'-side cards go in col-1, 'right'-side cards go in col-3.
   * Mobile: simple flex row → [dot] [card] (always).
   */
  const isLeft = side === 'left';

  return (
    <motion.div
      variants={nodeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      /* Mobile: flex row. Desktop: CSS grid 1fr auto 1fr */
      className="relative flex md:grid md:grid-cols-[1fr_40px_1fr] md:gap-0 items-start"
    >
      {/* ─── Desktop left-side card ─────────────────────────────────── */}
      <div className={`hidden md:block ${isLeft ? '' : ''}`}>
        {isLeft && (
          <div className="pr-8 flex justify-end">
            {renderCard(node, isActive, onToggle, contentVariants, imageLoaded, setImageLoaded, 'text-right')}
          </div>
        )}
      </div>

      {/* ─── Center dot + connector ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center flex-shrink-0 w-10 md:w-10">
        {/* Horizontal connector line to card */}
        <div
          className={`hidden md:block absolute top-5 h-px w-8 bg-gradient-to-r from-accent/40 to-success/40 ${
            isLeft ? 'right-full' : 'left-full'
          }`}
        />
        {/* Dot */}
        <motion.button
          onClick={() => onToggle(node?.id)}
          className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 mt-3 ${
            isActive
              ? 'bg-accent border-accent shadow-lg shadow-accent/30 scale-125'
              : 'bg-background border-muted-foreground/50 hover:border-accent hover:scale-110'
          }`}
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Toggle ${node?.title}`}
        >
          {isActive && (
            <span className="absolute inset-0 rounded-full animate-ping bg-accent/30" />
          )}
        </motion.button>
      </div>

      {/* ─── Desktop right-side card ────────────────────────────────── */}
      <div className={`hidden md:block`}>
        {!isLeft && (
          <div className="pl-8">
            {renderCard(node, isActive, onToggle, contentVariants, imageLoaded, setImageLoaded, 'text-left')}
          </div>
        )}
      </div>

      {/* ─── Mobile card (always right of dot) ─────────────────────── */}
      <div className="md:hidden flex-1 pl-4">
        {renderCard(node, isActive, onToggle, contentVariants, imageLoaded, setImageLoaded, 'text-left')}
      </div>
    </motion.div>
  );
};

/* ─── Reusable card renderer ──────────────────────────────────────────────── */

function renderCard(node, isActive, onToggle, contentVariants, imageLoaded, setImageLoaded, alignment) {
  return (
    <motion.div
      className={`glass-card p-5 md:p-6 max-w-lg w-full cursor-pointer group ${
        isActive ? 'neon-glow' : 'hover:neon-glow-hover'
      }`}
      onClick={() => onToggle(node?.id)}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className={`flex items-start justify-between mb-3 ${alignment === 'text-right' ? 'flex-row-reverse' : ''}`}>
        <div className={`flex-1 ${alignment}`}>
          <div className={`flex items-center space-x-2 mb-1 ${alignment === 'text-right' ? 'justify-end' : ''}`}>
            <Icon name={node?.icon} size={18} className="text-accent flex-shrink-0" />
            <span className="text-xs font-medium text-accent uppercase tracking-wide">
              {node?.category}
            </span>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
            {node?.title}
          </h3>
          <p className="text-sm text-muted-foreground">{node?.period}</p>
        </div>
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 ml-2"
        >
          <Icon name="ChevronDown" size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
        </motion.div>
      </div>

      {/* Preview */}
      <p className={`text-sm text-muted-foreground mb-3 line-clamp-2 ${alignment}`}>
        {node?.preview}
      </p>

      {/* Tags */}
      <div className={`flex flex-wrap gap-1 mb-2 ${alignment === 'text-right' ? 'justify-end' : ''}`}>
        {node?.tags?.slice(0, 3)?.map((tag, i) => (
          <span key={i} className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-md border border-accent/20">
            {tag}
          </span>
        ))}
        {node?.tags?.length > 3 && (
          <span className="px-2 py-0.5 text-xs bg-muted/20 text-muted-foreground rounded-md">
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
            className={`border-t border-border pt-4 mt-3 space-y-4 ${alignment}`}
          >
            {/* Full Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              {node?.fullDescription}
            </p>

            {/* Media Content */}
            {node?.media && (
              <div className="space-y-3">
                {node?.media?.image && (
                  <div className="relative overflow-hidden rounded-lg bg-muted/20">
                    <Image
                      src={node?.media?.image}
                      alt={node?.media?.imageAlt || node?.title}
                      className="w-full h-32 object-cover"
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && <div className="absolute inset-0 bg-muted/20 animate-pulse" />}
                  </div>
                )}

                {node?.media?.code && (
                  <div className="code-highlight text-left">
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
                  <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg text-left">
                    <Icon name="Trophy" size={20} className="text-success flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-success">{node?.media?.achievement}</p>
                      {node?.media?.achievementDetails && (
                        <p className="text-xs text-muted-foreground mt-0.5">{node?.media?.achievementDetails}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* All Tags */}
            <div className={`flex flex-wrap gap-1 ${alignment === 'text-right' ? 'justify-end' : ''}`}>
              {node?.tags?.map((tag, i) => (
                <span key={i} className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-md border border-accent/20">
                  {tag}
                </span>
              ))}
            </div>

            {/* Links */}
            {node?.links?.length > 0 && (
              <div className={`flex flex-wrap gap-2 pt-1 ${alignment === 'text-right' ? 'justify-end' : ''}`}>
                {node?.links?.map((link, i) => (
                  <a
                    key={i}
                    href={link?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 text-xs text-accent hover:text-accent/80 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Icon name={link?.icon || 'ExternalLink'} size={12} />
                    <span>{link?.label}</span>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default TimelineNode;