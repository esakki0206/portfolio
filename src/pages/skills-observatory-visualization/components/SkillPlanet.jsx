import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillPlanet = ({
  skill,
  size,
  isSelected,
  onSelect,
  onHover,
  isHovered,
  onRef,
  isMobile,
}) => {
  const localRef = useRef(null);

  // Merge local ref with parent onRef callback
  const setRef = useCallback(
    (node) => {
      localRef.current = node;
      if (onRef) onRef(node);
    },
    [onRef]
  );

  // Premium dark-mode glowing aesthetic colors based on categories
  const getPlanetColor = (category) => {
    const colors = {
      'Frontend': 'from-blue-600 to-cyan-400',
      'Backend': 'from-violet-600 to-fuchsia-500',
      'Database': 'from-emerald-600 to-teal-400',
      'Tools & Platforms': 'from-orange-600 to-amber-500',
      'Other': 'from-slate-600 to-gray-400',
    };
    return colors?.[category] || 'from-gray-600 to-slate-500';
  };

  const getGlowIntensity = (recentActivity) => {
    return recentActivity > 70
      ? 'shadow-[0_0_30px_rgba(255,255,255,0.15)]'
      : recentActivity > 40
        ? 'shadow-[0_0_20px_rgba(255,255,255,0.1)]'
        : 'shadow-lg';
  };

  const safeSize = size || 50;

  return (
    <div
      ref={setRef}
      className={`cursor-pointer ${isMobile ? '' : 'hover:z-20'}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        /* Initial placement at 0,0 — the RAF loop immediately sets the
           correct transform, so there's no visible flash. willChange
           hints the browser to promote this to a GPU layer. */
        willChange: 'transform',
        zIndex: isSelected ? 30 : isHovered ? 20 : 10,
      }}
      onClick={() => onSelect(skill)}
      onMouseEnter={() => !isMobile && onHover(skill)}
      onMouseLeave={() => !isMobile && onHover(null)}
    >
      {/* Planet Core */}
      <motion.div
        className={`relative rounded-full bg-gradient-to-br ${getPlanetColor(skill?.category)} ${getGlowIntensity(skill?.recentActivity || 0)} border border-white/10 backdrop-blur-sm`}
        style={{
          width: `${safeSize}px`,
          height: `${safeSize}px`,
          boxShadow: isSelected
            ? `0 0 50px ${skill?.color?.split(' ')[1]?.replace('to-', '') || 'rgba(255,255,255,0.4)'}`
            : isHovered
              ? `0 0 30px ${skill?.color?.split(' ')[1]?.replace('to-', '') || 'rgba(255,255,255,0.2)'}`
              : undefined,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isSelected ? 1.3 : isHovered ? 1.1 : 1,
          opacity: 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
        }}
        whileHover={!isMobile ? { scale: 1.15 } : {}}
        whileTap={{ scale: 0.95 }}
      >
        {/* Planet Surface Pattern (Glassmorphism overlay) */}
        <div className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/50"></div>
        </div>

        {/* Skill Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            name={skill?.icon}
            size={safeSize * 0.45}
            className="text-white drop-shadow-md"
          />
        </div>

        {/* Proficiency Ring (Subtle glowing orbit) */}
        <div className="absolute inset-0 rounded-full border border-white/10">
          <svg className="w-full h-full -rotate-90 drop-shadow-lg" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              strokeDasharray={`${(skill?.proficiency || 50) * 3.01} 301`}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>

        {/* Orbital Satellites */}
        {skill?.satellites?.map((satellite, index) => (
          <motion.div
            key={satellite?.name || index}
            className="absolute w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-3px',
              marginTop: '-3px',
              zIndex: 5,
            }}
            animate={{
              rotate: 360,
              x: Math.cos((index * 60) * Math.PI / 180) * (safeSize * 0.7),
              y: Math.sin((index * 60) * Math.PI / 180) * (safeSize * 0.7),
            }}
            transition={{
              rotate: {
                duration: 15 + index * 3,
                repeat: Infinity,
                ease: 'linear',
              },
              x: {
                duration: 15 + index * 3,
                repeat: Infinity,
                ease: 'linear',
              },
              y: {
                duration: 15 + index * 3,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />
        ))}

        {/* Skill Label (Always visible on mobile, fade on desktop) */}
        <motion.div
          className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: isMobile ? 1 : 0, y: 5 }}
          animate={{
            opacity: isMobile ? 1 : isHovered || isSelected ? 1 : 0.6,
            y: 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-xs font-semibold text-slate-200 whitespace-nowrap drop-shadow-md">
            {skill?.name}
          </div>
          <div className="text-[10px] font-medium text-slate-400">
            {skill?.proficiency}%
          </div>
        </motion.div>

        {/* Activity Pulse (Elegant subtle ping) */}
        {(skill?.recentActivity || 0) > 80 && (
          <motion.div
            className="absolute inset-0 rounded-full border border-white/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default SkillPlanet;