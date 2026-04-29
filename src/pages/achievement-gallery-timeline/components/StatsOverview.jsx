import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

/**
 * StatsOverview — headline metrics derived from the achievements data.
 * All values are computed or hard-coded from verified real data only.
 */
const StatsOverview = ({ achievements }) => {
  const competitions = achievements.filter((a) => a.category === 'Competitions').length;
  const certifications = achievements.filter((a) => a.category === 'Certifications').length;
  const liveProjects = achievements.filter((a) => a.liveUrl).length;

  const statItems = [
    {
      icon: 'Trophy',
      label: 'Competition Wins',
      value: competitions,
      color: 'from-yellow-500 to-orange-600',
      description: 'Hackathon & quiz prizes',
    },
    {
      icon: 'Award',
      label: 'Certifications',
      value: certifications,
      color: 'from-green-500 to-emerald-600',
      description: 'NPTEL & Coursera',
    },
    {
      icon: 'TrendingUp',
      label: 'GPA',
      value: '8.5',
      color: 'from-blue-500 to-indigo-600',
      description: '1st Rank · 5 Semesters',
    },
    {
      icon: 'Globe',
      label: 'Live in Production',
      value: liveProjects,
      color: 'from-cyan-500 to-blue-600',
      description: 'Real-world deployments',
    },
    {
      icon: 'Briefcase',
      label: 'Internship',
      value: '1',
      color: 'from-violet-500 to-purple-600',
      description: 'Free Will Technologies',
    },
    {
      icon: 'Star',
      label: 'Total Milestones',
      value: achievements.length,
      color: 'from-pink-500 to-rose-600',
      description: 'All verified achievements',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6 }}
      className="glass-card p-5 md:p-6 mb-8"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg md:text-xl font-bold text-foreground">Milestone Overview</h2>
          <p className="text-muted-foreground text-sm">Real numbers, real achievements</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group relative overflow-hidden"
          >
            <div className="glass-card p-3 md:p-4 h-full hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 group-hover:-translate-y-1">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative z-10 text-center">
                <div
                  className={`w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-lg mx-auto mb-2`}
                >
                  <Icon name={item.icon} size={18} className="text-white" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {item.value}
                </div>
                <h3 className="font-medium text-foreground text-xs md:text-sm mb-0.5">{item.label}</h3>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">{item.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsOverview;
