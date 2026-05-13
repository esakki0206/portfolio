import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

/**
 * AchievementCard — a single milestone card in the 2-column grid.
 * Uses whileInView for scroll-triggered reveal, glass-card styling,
 * and expandable detail panel.
 */
const AchievementCard = ({ achievement, index, isExpanded, onToggle }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic Excellence': return 'GraduationCap';
      case 'Certifications': return 'Award';
      case 'Competitions': return 'Trophy';
      case 'Experience': return 'Briefcase';
      case 'Projects': return 'Code2';
      default: return 'Medal';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic Excellence': return 'from-blue-500 to-indigo-600';
      case 'Certifications': return 'from-green-500 to-emerald-600';
      case 'Competitions': return 'from-yellow-500 to-orange-600';
      case 'Experience': return 'from-cyan-500 to-blue-600';
      case 'Projects': return 'from-violet-500 to-purple-600';
      default: return 'from-accent to-success';
    }
  };

  const getCategoryBg = (category) => {
    switch (category) {
      case 'Competitions': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Academic Excellence': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Certifications': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'Experience': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Projects': return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
      default: return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="group"
    >
      <motion.div
        className={`glass-card p-4 sm:p-5 md:p-6 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 ${
          isExpanded ? 'ring-1 ring-accent/40' : ''
        }`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* ── Header row ──────────────────────────────────────────────── */}
        <div className="flex items-start gap-3 mb-4">
          {/* Icon */}
          <div
            className={`w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br ${getCategoryColor(
              achievement?.category
            )} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}
          >
            <Icon
              name={getCategoryIcon(achievement?.category)}
              size={22}
              className="text-white"
            />
          </div>

          {/* Title + meta */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-foreground leading-snug group-hover:text-accent transition-colors duration-200">
              {achievement?.title}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{achievement?.organization}</p>
          </div>

          {/* Date badge */}
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-1 rounded-md flex-shrink-0 hidden sm:block">
            {achievement?.date}
          </span>
        </div>

        {/* Mobile date */}
        <span className="text-xs font-semibold text-accent mb-3 sm:hidden">
          {achievement?.date}
        </span>

        {/* Category badge */}
        <div className="mb-3">
          <span
            className={`inline-flex items-center space-x-1 px-2 py-0.5 text-xs font-medium rounded-md border ${getCategoryBg(
              achievement?.category
            )}`}
          >
            <Icon name={getCategoryIcon(achievement?.category)} size={12} />
            <span>{achievement?.category}</span>
          </span>
        </div>

        {/* ── Description ─────────────────────────────────────────────── */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {achievement?.description}
        </p>

        {/* ── Impact Metrics ──────────────────────────────────────────── */}
        {achievement?.impact && (
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4">
            {achievement.impact.map((metric, i) => (
              <div
                key={i}
                className="text-center p-1.5 sm:p-2 bg-muted/15 rounded-lg border border-border/30 min-w-0 overflow-hidden"
              >
                <div className="text-xs sm:text-base md:text-lg font-bold text-accent leading-tight truncate px-0.5">
                  {metric?.value}
                </div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground mt-0.5 truncate px-0.5">
                  {metric?.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Skills tags ─────────────────────────────────────────────── */}
        {achievement?.skills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {achievement.skills.slice(0, isExpanded ? undefined : 4).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-xs bg-muted/30 text-muted-foreground rounded-md hover:bg-accent/15 hover:text-accent transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
            {!isExpanded && achievement.skills.length > 4 && (
              <span className="px-2 py-0.5 text-xs bg-muted/20 text-muted-foreground rounded-md">
                +{achievement.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ── Toggle button ───────────────────────────────────────────── */}
        <button
          onClick={onToggle}
          className="flex items-center space-x-1 text-xs font-medium text-accent hover:text-accent/80 transition-colors duration-200 mt-auto pt-2"
        >
          <span>{isExpanded ? 'Show less' : 'Show details'}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <Icon name="ChevronDown" size={14} />
          </motion.span>
        </button>

        {/* ── Expanded content ────────────────────────────────────────── */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-3 border-t border-border space-y-4">
                {/* Image */}
                {achievement?.image && (
                  <div className="relative w-full h-40 md:h-48 rounded-lg overflow-hidden bg-muted/20">
                    <img
                      src={achievement.image}
                      alt={achievement.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Detailed Description */}
                {achievement?.detailedDescription && (
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {achievement.detailedDescription}
                  </p>
                )}

                {/* Links */}
                {(achievement?.liveUrl || achievement?.githubUrl || achievement?.certificateUrl) && (
                  <div className="flex flex-wrap gap-2">
                    {achievement.certificateUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement.certificateUrl, '_blank')}
                        iconName="FileText"
                        iconPosition="left"
                      >
                        View Certificate
                      </Button>
                    )}
                    {achievement.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement.liveUrl, '_blank')}
                        iconName="ExternalLink"
                        iconPosition="left"
                      >
                        Live Demo
                      </Button>
                    )}
                    {achievement.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement.githubUrl, '_blank')}
                        iconName="Github"
                        iconPosition="left"
                      >
                        View Code
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default AchievementCard;