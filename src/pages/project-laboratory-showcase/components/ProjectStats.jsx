import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ projects, filteredProjects }) => {
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
      icon: 'Star',
      label: 'GitHub Stars',
      value: projects?.reduce((sum, project) => sum + parseInt(project?.metrics?.githubStars), 0),
      color: 'text-warning'
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
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="glass-card p-4 text-center"
        >
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-muted/20 mb-3 ${stat?.color}`}>
            <Icon name={stat?.icon} size={24} />
          </div>
          <div className="text-2xl font-bold text-foreground mb-1">{stat?.value}</div>
          <div className="text-sm text-muted-foreground">{stat?.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectStats;