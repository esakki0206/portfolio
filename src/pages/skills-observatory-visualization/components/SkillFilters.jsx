import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillFilters = ({
  selectedView,
  onViewChange,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories = [] // Ensure categories has a default value
}) => {
  const presetViews = [
    {
      id: 'all',
      label: 'All Skills',
      icon: 'Globe',
      description: 'Complete skill universe'
    },
    {
      id: 'fullstack',
      label: 'Full Stack',
      icon: 'Layers',
      description: 'Web development stack'
    },
    {
      id: 'datascience',
      label: 'Data Science',
      icon: 'BarChart3',
      description: 'AI & ML skills'
    },
    {
      id: 'mobile',
      label: 'Mobile Dev',
      icon: 'Smartphone',
      description: 'Mobile app development'
    },
    {
      id: 'devops',
      label: 'DevOps',
      icon: 'Settings',
      description: 'Infrastructure & deployment'
    }
  ];

  // Handle view change with animation timing consideration
  const handleViewChange = (viewId) => {
    // Add a small delay to allow for smooth transitions
    setTimeout(() => {
      onViewChange(viewId);
    }, 50);
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Icon
          name="Search"
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10"
        />
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm || ''}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg text-gray-900 font-medium placeholder-gray-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200 relative z-0"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors duration-200 z-10"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {/* Preset Views */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Skill Clusters</h3>
        <div className="grid grid-cols-1 gap-2">
          {presetViews?.map((view) => (
            <motion.button
              key={view?.id}
              onClick={() => handleViewChange(view?.id)}
              className={`p-4 rounded-lg border text-left transition-all duration-200 ${selectedView === view?.id
                  ? 'bg-accent/10 border-accent text-accent'
                  : 'bg-muted/20 border-border text-muted-foreground hover:text-foreground hover:bg-muted/30'
                }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedView === view?.id ? 'bg-accent text-background' : 'bg-muted text-muted-foreground'
                  }`}>
                  <Icon name={view?.icon} size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{view?.label}</div>
                  <div className="text-xs opacity-75">{view?.description}</div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => onCategoryChange('all')}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${selectedCategory === 'all'
                ? 'bg-accent/10 text-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
          >
            All Categories
          </button>
          {categories?.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors duration-200 ${selectedCategory === category
                  ? 'bg-accent/10 text-accent'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>



      {/* Legend */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground mb-3">Legend</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-accent to-success"></div>
            <span className="text-muted-foreground">Planet size = Proficiency level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
            <span className="text-muted-foreground">Glow intensity = Recent activity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <span className="text-muted-foreground">Satellites = Related technologies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillFilters;