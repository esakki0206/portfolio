import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ achievements }) => {
  const categories = [...new Set(achievements.map((a) => a.category))];
  const totalSkills = achievements.reduce(
    (acc, a) => acc + (a.skills ? a.skills.length : 0),
    0
  );
  const liveProjects = achievements.filter(
    (a) => a.liveUrl || (a.impact && a.impact.some((i) => i.value === 'Live'))
  ).length;

  const statItems = [
    {
      icon: 'Trophy',
      label: 'Total Milestones',
      value: achievements.length,
      color: 'from-yellow-500 to-orange-600',
      description: 'Earned milestones',
    },
    {
      icon: 'Tag',
      label: 'Categories',
      value: categories.length,
      color: 'from-blue-500 to-indigo-600',
      description: 'Experience areas',
    },
    {
      icon: 'TrendingUp',
      label: 'GPA',
      value: '8.5',
      color: 'from-green-500 to-emerald-600',
      description: 'Academic performance',
    },
    {
      icon: 'Globe',
      label: 'Live in Production',
      value: liveProjects,
      color: 'from-cyan-500 to-blue-600',
      description: 'Real-world deployments',
    },
    {
      icon: 'Zap',
      label: 'Skills Proven',
      value: totalSkills,
      color: 'from-purple-500 to-pink-600',
      description: 'Across all milestones',
    },
    {
      icon: 'Calendar',
      label: 'Journey Started',
      value: '2023',
      color: 'from-red-500 to-pink-600',
      description: 'College journey began',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Milestone Overview</h2>
          <p className="text-muted-foreground text-sm">Real numbers, real achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group relative overflow-hidden"
          >
            <div className="glass-card p-4 h-full hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group-hover:-translate-y-1">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-lg`}
                  >
                    <Icon name={item.icon} size={20} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {item.value}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsOverview;
