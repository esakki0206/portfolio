import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterSystem = ({ 
  selectedTechnology, 
  onTechnologyChange, 
  searchQuery,
  onSearchChange,
  onClearFilters 
}) => {
  const technologies = [
    { id: 'all', label: 'All Technologies', icon: 'Code2' },
    { id: 'react', label: 'React', icon: 'Atom' },
    { id: 'nodejs', label: 'Node.js', icon: 'Server' },
    { id: 'mongodb', label: 'MongoDB', icon: 'Database' },
    { id: 'express', label: 'Express', icon: 'ServerCog' },
    { id: 'tailwind css', label: 'Tailwind CSS', icon: 'Palette' },
    { id: 'php', label: 'PHP', icon: 'FileCode' },
    { id: 'mysql', label: 'MySQL', icon: 'Database' },
    { id: 'iot', label: 'IoT', icon: 'Cpu' }
  ];

  const hasActiveFilters = selectedTechnology !== 'all' || 
                           searchQuery?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 mb-8"
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-3 bg-background/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Technology Filter */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-3">Filter by Technology</h3>
          <div className="flex flex-wrap gap-2">
            {technologies?.map((tech) => (
              <button
                key={tech?.id}
                onClick={() => onTechnologyChange(tech?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTechnology === tech?.id
                    ? 'bg-accent text-background' :'bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                }`}
              >
                <Icon name={tech?.icon} size={16} />
                <span>{tech?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Active filters applied
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default FilterSystem;