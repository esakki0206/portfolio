import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ achievements }) => {
  const calculateStats = () => {
    const totalAchievements = achievements?.length;
    const categories = [...new Set(achievements.map(a => a.category))];
    const totalParticipants = achievements?.filter(a => a?.participants)?.reduce((sum, a) => sum + a?.participants, 0);
    const averageRanking = achievements?.filter(a => a?.ranking)?.reduce((sum, a, _, arr) => sum + a?.ranking / arr?.length, 0);
    const validCertifications = achievements?.filter(a => a?.category === 'Certifications' && (!a?.validUntil || new Date(a.validUntil) > new Date()))?.length;
    const highestGPA = Math.max(...achievements?.filter(a => a?.gpa)?.map(a => a?.gpa), 0);

    return {
      totalAchievements,
      categories: categories?.length,
      totalParticipants,
      averageRanking: Math.round(averageRanking) || 0,
      validCertifications,
      highestGPA: highestGPA?.toFixed(2)
    };
  };

  const stats = calculateStats();

  const statItems = [
    {
      icon: 'Trophy',
      label: 'Total Achievements',
      value: stats?.totalAchievements,
      color: 'from-yellow-500 to-orange-600',
      description: 'Across all categories'
    },
    {
      icon: 'Tag',
      label: 'Categories',
      value: stats?.categories,
      color: 'from-blue-500 to-indigo-600',
      description: 'Different achievement types'
    },
    {
      icon: 'Users',
      label: 'Total Competitors',
      value: stats?.totalParticipants?.toLocaleString(),
      color: 'from-purple-500 to-pink-600',
      description: 'Across all competitions'
    },
    {
      icon: 'Award',
      label: 'Avg. Ranking',
      value: stats?.averageRanking > 0 ? `#${stats?.averageRanking}` : 'N/A',
      color: 'from-green-500 to-emerald-600',
      description: 'In competitive events'
    },
    {
      icon: 'Shield',
      label: 'Valid Certifications',
      value: stats?.validCertifications,
      color: 'from-cyan-500 to-blue-600',
      description: 'Currently active'
    },
    {
      icon: 'TrendingUp',
      label: 'Highest GPA',
      value: stats?.highestGPA > 0 ? stats?.highestGPA : 'N/A',
      color: 'from-red-500 to-pink-600',
      description: 'Academic excellence'
    }
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
          <h2 className="text-xl font-bold text-foreground">Achievement Overview</h2>
          <p className="text-muted-foreground text-sm">Key metrics and accomplishments</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems?.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden"
          >
            <div className="glass-card p-4 h-full hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group-hover:-translate-y-1">
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item?.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${item?.color} rounded-lg flex items-center justify-center shadow-lg`}>
                    <Icon name={item?.icon} size={20} className="text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                      {item?.value}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item?.label}</h3>
                  <p className="text-sm text-muted-foreground">{item?.description}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Additional Insights */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-semibold text-success">
              {Math.round((achievements?.filter(a => a?.ranking && a?.ranking <= 3)?.length / achievements?.filter(a => a?.ranking)?.length) * 100) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">Top 3 Finishes</div>
          </div>
          
          <div className="p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-semibold text-accent">
              {new Date()?.getFullYear() - Math.min(...achievements?.map(a => new Date(a.date)?.getFullYear()))}
            </div>
            <div className="text-sm text-muted-foreground">Years of Achievement</div>
          </div>
          
          <div className="p-3 bg-muted/10 rounded-lg">
            <div className="text-lg font-semibold text-warning">
              {achievements?.filter(a => a?.skills && a?.skills?.length > 0)?.reduce((acc, a) => acc + a?.skills?.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Skills Demonstrated</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsOverview;