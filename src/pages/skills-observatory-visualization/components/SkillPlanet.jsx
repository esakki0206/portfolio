import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillPlanet = ({ 
  skill, 
  position, 
  size, 
  isSelected, 
  onSelect, 
  onHover, 
  isHovered 
}) => {
  const planetRef = useRef(null);

  const getPlanetColor = (category) => {
    const colors = {
      'Programming Languages': 'from-blue-500 to-cyan-400',
      'Frameworks': 'from-green-500 to-emerald-400',
      'Tools': 'from-purple-500 to-violet-400',
      'Databases': 'from-orange-500 to-amber-400',
      'Cloud': 'from-pink-500 to-rose-400',
      'Emerging Tech': 'from-indigo-500 to-blue-400'
    };
    return colors?.[category] || 'from-gray-500 to-slate-400';
  };

  const getGlowIntensity = (recentActivity) => {
    return recentActivity > 70 ? 'shadow-2xl' : recentActivity > 40 ? 'shadow-xl' : 'shadow-lg';
  };

  // Ensure position is always defined with fallback values
  const safePosition = position || { x: 50, y: 50 };
  const safeSize = size || 50;

  return (
    <motion.div
      ref={planetRef}
      className="absolute cursor-pointer"
      style={{
        left: `${safePosition.x}%`,
        top: `${safePosition.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 10 : isHovered ? 5 : 1
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.3 : isHovered ? 1.1 : 1,
        opacity: 1
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20,
        delay: (skill?.id || 0) * 0.1
      }}
      whileHover={{ scale: 1.1 }}
      onClick={() => onSelect(skill)}
      onMouseEnter={() => onHover(skill)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Planet Core */}
      <div 
        className={`relative rounded-full bg-gradient-to-br ${getPlanetColor(skill?.category)} ${getGlowIntensity(skill?.recentActivity || 0)}`}
        style={{ 
          width: `${safeSize}px`, 
          height: `${safeSize}px`,
          boxShadow: isSelected ? `0 0 40px ${skill?.color || '#888'}` : `0 0 20px ${skill?.color || '#888'}`
        }}
      >
        {/* Planet Surface Pattern */}
        <div className="absolute inset-0 rounded-full opacity-30">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>

        {/* Skill Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon 
            name={skill?.icon} 
            size={safeSize * 0.4} 
            className="text-white drop-shadow-lg"
          />
        </div>

        {/* Proficiency Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-white/30">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth="2"
              strokeDasharray={`${(skill?.proficiency || 50) * 3.01} 301`}
              className="transition-all duration-1000"
            />
          </svg>
        </div>

        {/* Orbital Satellites */}
        {skill?.satellites && skill?.satellites?.map((satellite, index) => (
          <motion.div
            key={satellite?.name || index}
            className="absolute w-2 h-2 bg-white rounded-full shadow-lg"
        style={{
  position: 'absolute',
  left: `${safePosition.x}px`,
  top: `${safePosition.y}px`,
  transform: 'translate(-50%, -50%)',
  zIndex: isSelected ? 10 : isHovered ? 5 : 1
}}
            animate={{
              rotate: 360,
              x: Math.cos((index * 60) * Math.PI / 180) * (safeSize * 0.8),
              y: Math.sin((index * 60) * Math.PI / 180) * (safeSize * 0.8)
            }}
            transition={{
              rotate: {
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear"
              },
              x: {
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear"
              },
              y: {
                duration: 10 + index * 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          />
        ))}

        {/* Skill Label */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isHovered || isSelected ? 1 : 0.7, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs font-medium text-foreground whitespace-nowrap">
            {skill?.name}
          </div>
          <div className="text-xs text-muted-foreground">
            {skill?.proficiency}%
          </div>
        </motion.div>

        {/* Activity Pulse */}
        {(skill?.recentActivity || 0) > 70 && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SkillPlanet;