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
  selectedView 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [universeRotation, setUniverseRotation] = useState(0);
  const [planetPositions, setPlanetPositions] = useState({});
  const universeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const positionsRef = useRef({});

  // Track mouse position for tooltip
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e?.clientX, y: e?.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate planet size based on proficiency
  const getPlanetSize = useCallback((proficiency) => {
    return Math.max(40, Math.min(80, proficiency * 0.8));
  }, []);

  // Force-directed layout to prevent overlapping
  const calculateNonOverlappingPositions = useCallback((skillsArray, view) => {
    const positions = {};
    const centerX = 50;
    const centerY = 50;
    const maxRadius = 40; // Maximum distance from center

    // Initialize positions
    skillsArray?.forEach((skill, index) => {
      const angle = (index * 137.5) % 360; // Golden angle
      const radius = Math.min(maxRadius, 10 + (index * 30 / skillsArray.length));
      
      positions[skill.id] = {
        x: centerX + Math.cos(angle * Math.PI / 180) * radius,
        y: centerY + Math.sin(angle * Math.PI / 180) * radius,
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

          // Center attraction force
          const dx = centerX - pos.x;
          const dy = centerY - pos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force = 0.001 * distance;
          
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

    const newPositions = calculateNonOverlappingPositions(skills, selectedView);
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
  }, [skills, selectedView, calculateNonOverlappingPositions]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-background via-background to-primary/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Stars - Updated for slow, elegant movement */}
        {Array.from({ length: 150 })?.map((_, i) => {
          // Generate random initial positions
          const initialX = Math.random() * 100;
          const initialY = Math.random() * 100;
          
          // Very slow, subtle movement parameters
          const travelDistance = 1 + Math.random() * 2; // Very small distance
          const travelAngle = Math.random() * Math.PI * 2; // Random direction
          const travelSpeed = 0.2 + Math.random() * 0.3; // Very slow speed
          const size = 0.5 + Math.random() * 1.5; // Varied star sizes
          const opacity = 0.3 + Math.random() * 0.4; // Varied opacity
          
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
                  Math.cos(travelAngle) * travelDistance,
                  Math.cos(travelAngle) * travelDistance * 2,
                  0
                ],
                y: [
                  0,
                  Math.sin(travelAngle) * travelDistance,
                  Math.sin(travelAngle) * travelDistance * 2,
                  0
                ],
                opacity: [opacity, opacity * 1.5, opacity * 1.5, opacity],
              }}
              transition={{
                duration: 100 / travelSpeed, // Very long duration for slow movement
                repeat: Infinity,
                ease: "linear",
                times: [0, 0.3, 0.7, 1]
              }}
            />
          );
        })}

        {/* Nebula Effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-accent/30 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-success/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      </div>
      
      {/* Universe Container */}
      <motion.div
        ref={universeRef}
        className="relative w-full h-full"
        animate={{ rotate: universeRotation }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Central Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-accent via-success to-warning rounded-full shadow-2xl"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              scale: { duration: 3, repeat: Infinity },
            }}
            style={{
              boxShadow: '0 0 60px rgba(0, 245, 255, 0.5)'
            }}
          >
            <div className="absolute inset-2 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
          </motion.div>
        </div>

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
          />
        ))}

        {/* Orbital Rings */}
        {[20, 35, 50]?.map((radius, index) => (
          <motion.div
            key={index}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full"
            style={{
              width: `${radius * 2}%`,
              height: `${radius * 2}%`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 60 + index * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </motion.div>
      
      {/* Skill Tooltip */}
      <SkillTooltip
        skill={hoveredSkill}
        position={mousePosition}
        isVisible={!!hoveredSkill}
      />
      
      {/* View Indicator */}
      <div className="absolute top-4 left-4 glass-card px-4 py-2">
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
      <motion.div
        className="absolute bottom-4 right-4 glass-card px-4 py-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <div className="text-xs text-muted-foreground">
          🖱️ Hover to explore • 🖱️ Click for details
        </div>
      </motion.div>
    </div>
  );
};

export default SkillUniverse;