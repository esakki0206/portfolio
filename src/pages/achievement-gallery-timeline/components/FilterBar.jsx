import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  totalCount,
  filteredCount 
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 w-full justify-center">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onCategoryChange('all')}
            className="magnetic-button"
          >
            All ({totalCount})
          </Button>
          {categories?.map((category) => (
            <Button
              key={category?.name}
              variant={selectedCategory === category?.name ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category?.name)}
              iconName={category?.icon}
              iconPosition="left"
              className="magnetic-button"
            >
              {category?.name} ({category?.count})
            </Button>
          ))}
        </div>
      </div>
      {/* Results Count */}
      {selectedCategory !== 'all' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalCount} achievements
            <span> in {selectedCategory}</span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;