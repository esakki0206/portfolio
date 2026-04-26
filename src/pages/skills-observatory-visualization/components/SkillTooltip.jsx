import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillTooltip = ({ skill, position, isVisible }) => {
  const [adjustedPosition, setAdjustedPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef(null);
  
  // Adjust position to prevent going off-screen
  useEffect(() => {
    if (!isVisible || !position || !tooltipRef.current) return;
    
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let x = position.x + 20;
    let y = position.y - 10;
    
    // Adjust if tooltip would go off the right edge of the screen
    if (x + tooltipRect.width > viewportWidth) {
      x = position.x - tooltipRect.width - 20;
    }
    
    // Adjust if tooltip would go off the bottom edge of the screen
    if (y + tooltipRect.height > viewportHeight) {
      y = position.y - tooltipRect.height - 10;
    }
    
    // Ensure tooltip doesn't go off the top edge
    if (y < 10) {
      y = 10;
    }
    
    // Ensure tooltip doesn't go off the left edge
    if (x < 10) {
      x = 10;
    }
    
    setAdjustedPosition({ x, y });
  }, [position, isVisible]);

  if (!skill || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={tooltipRef}
        className="fixed z-50 pointer-events-none"
        style={{
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          maxWidth: 'min(96vw, 384px)', // Ensure it doesn't exceed viewport width
        }}
        initial={{ opacity: 0, scale: 0.8, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="glass-card p-4 min-w-80 max-w-96 shadow-elevation-3">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill?.color || 'from-gray-500 to-gray-400'} flex items-center justify-center`}>
              <Icon name={skill?.icon} size={20} className="text-white" />
            </div>
            <div className="min-w-0 flex-1"> {/* Prevent text overflow */}
              <h3 className="font-semibold text-foreground truncate">{skill?.name}</h3>
              <p className="text-sm text-muted-foreground truncate">{skill?.category}</p>
            </div>
          </div>

          {/* Proficiency Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">Proficiency</span>
              <span className="text-sm text-accent font-semibold">{skill?.proficiency || 0}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="h-2 bg-gradient-to-r from-accent to-success rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${skill?.proficiency || 0}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Experience</span>
            </div>
            <p className="text-sm text-muted-foreground">{skill?.experience || 'Not specified'}</p>
          </div>

          {/* Recent Activity */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Activity" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Recent Activity</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-full bg-muted rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    (skill?.recentActivity || 0) > 70 ? 'bg-success' : 
                    (skill?.recentActivity || 0) > 40 ? 'bg-warning' : 'bg-muted-foreground'
                  }`}
                  style={{ width: `${skill?.recentActivity || 0}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground min-w-[30px] text-right">
                {skill?.recentActivity || 0}%
              </span>
            </div>
          </div>

          {/* Certifications */}
          {skill?.certifications && skill?.certifications?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Award" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Certifications</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skill?.certifications?.map((cert, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20 truncate max-w-[120px]"
                    title={cert}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {skill?.projects && skill?.projects?.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Code2" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Projects</span>
              </div>
              <div className="space-y-1">
                {skill?.projects?.slice(0, 3)?.map((project, index) => (
                  <div key={index} className="text-sm text-muted-foreground truncate" title={project}>
                    • {project}
                  </div>
                ))}
                {skill?.projects?.length > 3 && (
                  <div className="text-sm text-accent">
                    +{skill?.projects?.length - 3} more projects
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Learning Resources */}
          {skill?.resources && skill?.resources?.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="BookOpen" size={16} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Learning Resources</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {skill?.resources?.map((resource, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded border truncate max-w-[120px]"
                    title={resource}
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillTooltip;