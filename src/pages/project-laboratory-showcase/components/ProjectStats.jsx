import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

/**
 * ProjectStats — displays key metrics about the project portfolio.
 * Enhanced with Live/Full-Stack/IoT/Mobile breakdowns.
 */
const ProjectStats = ({ projects, filteredProjects }) => {
  const liveCount = projects?.filter(p => p.status === 'Live')?.length || 0;
  const fullStackCount = projects?.filter(p => p.category === 'Full Stack Development')?.length || 0;
  const iotCount = projects?.filter(p => p.category === 'IoT / Embedded Systems')?.length || 0;
  const mobileCount = projects?.filter(p =>
    p.category === 'Mobile & AR Development'
  )?.length || 0;

  const stats = [
    {
      icon: 'Code2',
      label: 'Total Projects',
      value: projects?.length,
      color: 'text-accent'
    },
    {
      icon: 'Eye',
      label: 'Showing',
      value: filteredProjects?.length,
      color: 'text-success'
    },
    {
      icon: 'MonitorPlay',
      label: 'Live',
      value: liveCount,
      color: 'text-warning'
    },
    {
      icon: 'Globe',
      label: 'Full-Stack',
      value: fullStackCount,
      color: 'text-blue-400'
    },
    {
      icon: 'Cpu',
      label: 'IoT',
      value: iotCount,
      color: 'text-teal-400'
    },
    {
      icon: 'Smartphone',
      label: 'Mobile/AR',
      value: mobileCount,
      color: 'text-purple-400'
    },
    {
      icon: 'GitBranch',
      label: 'Technologies',
      value: [...new Set(projects.flatMap(p => p.techStack))]?.length,
      color: 'text-error'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 mb-8"
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.06 }}
          className="glass-card p-3 sm:p-4 text-center"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-muted/20 mb-2 sm:mb-3 ${stat?.color}`}>
            <Icon name={stat?.icon} size={20} />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-foreground mb-0.5 sm:mb-1">{stat?.value}</div>
          <div className="text-xs text-muted-foreground">{stat?.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStats;