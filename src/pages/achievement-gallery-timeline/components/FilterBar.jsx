import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortBy, 
  onSortChange, 
  searchTerm, 
  onSearchChange,
  totalCount,
  filteredCount 
}) => {
  const sortOptions = [
    { value: 'date', label: 'Date', icon: 'Calendar' },
    { value: 'category', label: 'Category', icon: 'Tag' },
    { value: 'title', label: 'Title', icon: 'Type' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search achievements..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted/20 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
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

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex space-x-1">
            {sortOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={sortBy === option?.value ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onSortChange(option?.value)}
                iconName={option?.icon}
                iconPosition="left"
                className="magnetic-button"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
      {/* Results Count */}
      {(searchTerm || selectedCategory !== 'all') && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            Showing {filteredCount} of {totalCount} achievements
            {searchTerm && (
              <span> for "{searchTerm}"</span>
            )}
            {selectedCategory !== 'all' && (
              <span> in {selectedCategory}</span>
            )}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FilterBar;