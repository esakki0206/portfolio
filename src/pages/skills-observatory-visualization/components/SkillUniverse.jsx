import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import SkillPlanet from './SkillPlanet';
import SkillTooltip from './SkillTooltip';

const SkillUniverse = ({ 
  skills, 
  selectedSkill, 
  onSkillSelect, 
  hoveredSkill, 
  onSkillHover,
  selectedView,
  isMobile
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [planetPositions, setPlanetPositions] = useState({});
  const universeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const positionsRef = useRef({});

  // Track mouse position for tooltip
  useEffect(() => {
    if (isMobile) return; // Don't track mouse on mobile
    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Calculate planet size based on proficiency
  const getPlanetSize = useCallback((proficiency) => {
    return Math.max(40, Math.min(80, proficiency * 0.8));
  }, []);

  // Force-directed layout to prevent overlapping
  const calculateNonOverlappingPositions = useCallback((skillsArray, view, mobile) => {
    const positions = {};
    
    if (mobile) {
      // Clean stacked grid layout for mobile
      skillsArray?.forEach((skill, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        positions[skill.id] = {
          x: col === 0 ? 30 : 70, // Two columns
          y: 10 + row * 18,       // Vertical spacing
          vx: 0,
          vy: 0
        };
      });
      return positions;
    }

    // Category gravity centers for desktop cluster layout
    const categoryCenters = {
      'Frontend': { x: 30, y: 30 },
      'Backend': { x: 70, y: 30 },
      'Database': { x: 50, y: 50 },
      'Tools & Platforms': { x: 30, y: 70 },
      'Other': { x: 70, y: 70 },
    };

    // Initialize positions near their gravity centers
    skillsArray?.forEach((skill, index) => {
      const angle = (index * 137.5) % 360;
      const center = categoryCenters[skill.category] || { x: 50, y: 50 };
      
      positions[skill.id] = {
        x: center.x + Math.cos(angle * Math.PI / 180) * 5,
        y: center.y + Math.sin(angle * Math.PI / 180) * 5,
        vx: 0,
        vy: 0
      };
    });

    // Run simulation to avoid overlaps
    const runSimulation = () => {
      const positionsCopy = { ...positions };
      const planetSizes = {};
      
      // Calculate sizes
      skillsArray?.forEach(skill => {
        planetSizes[skill.id] = getPlanetSize(skill.proficiency) / 200; // Normalized size
      });

      // Apply forces
      for (let i = 0; i < 5; i++) { // Run multiple iterations
        skillsArray?.forEach(skill => {
          const pos = positionsCopy[skill.id];
          if (!pos) return;

          const center = categoryCenters[skill.category] || { x: 50, y: 50 };

          // Center attraction force
          const dx = center.x - pos.x;
          const dy = center.y - pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = 0.002 * distance;
          
          pos.vx += force * dx / distance;
          pos.vy += force * dy / distance;

          // Repulsion between planets
          skillsArray?.forEach(otherSkill => {
            if (skill.id === otherSkill.id) return;
            
            const otherPos = positionsCopy[otherSkill.id];
            if (!otherPos) return;
            
            const dx = pos.x - otherPos.x;
            const dy = pos.y - otherPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = planetSizes[skill.id] + planetSizes[otherSkill.id] + 5;
            
            if (distance < minDistance) {
              const force = 0.1 * (minDistance - distance) / minDistance;
              pos.vx += force * dx / distance;
              pos.vy += force * dy / distance;
            }
          });

          // Apply velocity with damping
          pos.vx *= 0.5;
          pos.vy *= 0.5;
          pos.x += pos.vx;
          pos.y += pos.vy;

          // Constrain to bounds
          pos.x = Math.max(5, Math.min(95, pos.x));
          pos.y = Math.max(5, Math.min(95, pos.y));
        });
      }

      return positionsCopy;
    };

    return runSimulation();
  }, [getPlanetSize]);

  // Update positions when skills or view changes
  useEffect(() => {
    if (skills.length === 0) return;

    const newPositions = calculateNonOverlappingPositions(skills, selectedView, isMobile);
    positionsRef.current = newPositions;
    setPlanetPositions(newPositions);

    // Start animation loop for smooth movement
    const animate = () => {
      setPlanetPositions(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          if (positionsRef.current[key]) {
            updated[key] = {
              ...updated[key],
              x: positionsRef.current[key].x,
              y: positionsRef.current[key].y
            };
          }
        });
        return updated;
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [skills, selectedView, isMobile, calculateNonOverlappingPositions]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-y-auto overflow-x-hidden bg-gradient-to-br from-background via-background to-primary/20 ${isMobile ? 'h-full custom-scrollbar' : 'h-full'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Stars - Fixed for slow, elegant, non-distracting movement */}
        {Array.from({ length: 60 })?.map((_, i) => {
          // Generate random initial positions
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          
          // Very slow, subtle movement parameters
          const travelDistance = 0.5 + Math.random() * 1; 
          const travelAngle = Math.random() * Math.PI * 2; 
          const duration = 20 + Math.random() * 20; // Long duration for slow movement
          const size = 0.5 + Math.random() * 1.5; 
          const opacity = 0.1 + Math.random() * 0.3; 
          
          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                left: `${initialX}%`,
                top: `${initialY}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
              }}
              animate={{
                x: [
                  0,
                  Math.cos(travelAngle) * travelDistance * 10,
                  Math.cos(travelAngle) * travelDistance * 20,
                  0
                ],
                y: [
                  0,
                  Math.sin(travelAngle) * travelDistance * 10,
                  Math.sin(travelAngle) * travelDistance * 20,
                  0
                ],
                opacity: [opacity, opacity * 1.5, opacity * 1.5, opacity],
              }}
              transition={{
                duration: duration, 
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.7, 1]
              }}
            />
          );
        })}

        {/* Nebula Effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-success/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Universe Container */}
      <motion.div
        ref={universeRef}
        className="relative w-full"
        style={{ minHeight: isMobile ? '120%' : '100%' }}
        animate={{ rotate: isMobile ? 0 : [0, 360] }}
        transition={{ duration: 240, repeat: Infinity, ease: "linear" }}
      >
        {/* Central Core (Hidden on mobile) */}
        {!isMobile && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-accent via-success to-warning rounded-full shadow-2xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              }}
              style={{
                boxShadow: '0 0 40px rgba(0, 245, 255, 0.3)'
              }}
            >
              <div className="absolute inset-2 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            </motion.div>
          </div>
        )}

        {/* Skill Planets */}
        {skills?.map((skill) => (
          <SkillPlanet
            key={skill?.id}
            skill={skill}
            position={planetPositions[skill.id] || { x: 50, y: 50 }}
            size={getPlanetSize(skill?.proficiency)}
            isSelected={selectedSkill?.id === skill?.id}
            isHovered={hoveredSkill?.id === skill?.id}
            onSelect={onSkillSelect}
            onHover={onSkillHover}
            isMobile={isMobile}
          />
        ))}

        {/* Orbital Rings (Hidden on mobile) */}
        {!isMobile && [20, 35, 50]?.map((radius, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full pointer-events-none"
            style={{
              width: `${radius * 2}%`,
              height: `${radius * 2}%`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 120 + index * 40,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
      
      {/* Skill Tooltip */}
      {!isMobile && (
        <SkillTooltip
          skill={hoveredSkill}
          position={mousePosition}
          isVisible={!!hoveredSkill}
        />
      )}
      
      {/* View Indicator */}
      <div className="absolute top-4 left-4 glass-card px-4 py-2 z-10">
        <div className="text-sm font-medium text-foreground">
          {selectedView === 'all' ? 'Complete Universe' :
           selectedView === 'fullstack' ? 'Full Stack Galaxy' :
           selectedView === 'datascience' ? 'Data Science Cluster' :
           selectedView === 'mobile' ? 'Mobile Development System' :
           selectedView === 'devops' ? 'DevOps Pipeline' : 'Skills Observatory'}
        </div>
        <div className="text-xs text-muted-foreground">
          {skills?.length} skills • Click to explore
        </div>
      </div>
      
      {/* Navigation Hint */}
      {!isMobile && (
        <motion.div
          className="absolute bottom-4 right-4 glass-card px-4 py-2 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="text-xs text-muted-foreground">
            🖱️ Hover to explore • 🖱️ Click for details
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SkillUniverse;