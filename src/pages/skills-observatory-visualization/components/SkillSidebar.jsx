import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillSidebar = ({ selectedSkill, onClose, skillProgressData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'progress', label: 'Progress', icon: 'TrendingUp' },
    { id: 'projects', label: 'Projects', icon: 'Code2' },
    { id: 'resources', label: 'Resources', icon: 'BookOpen' }
  ];

  if (!selectedSkill) return null;

  const renderProgressChart = () => {
    const progressData = skillProgressData?.[selectedSkill?.id] || [];
    
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-foreground">Learning Timeline</h4>
        <div className="relative h-48 bg-muted/20 rounded-lg p-4">
          <svg className="w-full h-full" viewBox="0 0 400 160">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4]?.map(i => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2="400"
                y2={i * 40}
                stroke="rgba(148, 163, 184, 0.2)"
                strokeWidth="1"
              />
            ))}
            
            {/* Progress line */}
            <motion.polyline
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              points={progressData?.map((point, index) => 
                `${(index / (progressData?.length - 1)) * 380 + 10},${160 - (point?.value / 100) * 140}`
              )?.join(' ')}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            
            {/* Data points */}
            {progressData?.map((point, index) => (
              <motion.circle
                key={index}
                cx={(index / (progressData?.length - 1)) * 380 + 10}
                cy={160 - (point?.value / 100) * 140}
                r="4"
                fill="var(--color-accent)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            ))}
            
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-success)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Progress milestones */}
        <div className="space-y-2">
          {progressData?.slice(-3)?.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 bg-muted/30 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium text-foreground">{milestone?.label}</div>
                <div className="text-xs text-muted-foreground">{milestone?.date}</div>
              </div>
              <div className="text-sm font-semibold text-accent">{milestone?.value}%</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Skill Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{selectedSkill?.proficiency || 0}%</div>
                <div className="text-sm text-muted-foreground">Proficiency</div>
              </div>
              <div className="bg-muted/20 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success">{selectedSkill?.recentActivity || 0}%</div>
                <div className="text-sm text-muted-foreground">Recent Activity</div>
              </div>
            </div>
            {/* Description */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">About</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedSkill?.description || 'No description available.'}
              </p>
            </div>
            {/* Experience */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">Experience</h4>
              <p className="text-sm text-muted-foreground">
                {selectedSkill?.experience || 'Not specified'}
              </p>
            </div>
            {/* Certifications */}
            {selectedSkill?.certifications && selectedSkill?.certifications?.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">Certifications</h4>
                <div className="space-y-2">
                  {selectedSkill?.certifications?.map((cert, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                      <Icon name="Award" size={16} className="text-warning" />
                      <span className="text-sm text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'progress':
        return renderProgressChart();

      case 'projects':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Related Projects</h4>
            {selectedSkill?.projects && selectedSkill?.projects?.length > 0 ? (
              <div className="space-y-3">
                {selectedSkill?.projects?.map((project, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="Code2" size={16} className="text-accent mt-1" />
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{project}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Implementation showcasing {selectedSkill?.name} expertise
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Code2" size={48} className="mx-auto mb-4 opacity-50" />
                <p>No projects available for this skill yet.</p>
              </div>
            )}
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Learning Resources</h4>
            {selectedSkill?.resources && selectedSkill?.resources?.length > 0 ? (
              <div className="space-y-3">
                {selectedSkill?.resources?.map((resource, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border">
                    <div className="flex items-start space-x-3">
                      <Icon name="BookOpen" size={16} className="text-success mt-1" />
                      <div className="flex-1">
                        <h5 className="font-medium text-foreground">{resource}</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Recommended learning resource
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
                <p>No resources available for this skill yet.</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-96 bg-card border-l border-border shadow-elevation-3 z-40 overflow-hidden"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${selectedSkill?.color || 'from-gray-500 to-gray-400'} flex items-center justify-center`}>
                <Icon name={selectedSkill?.icon} size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{selectedSkill?.name}</h2>
                <p className="text-xs text-muted-foreground">{selectedSkill?.category}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              className="h-8 w-8"
            />
          </div>

          {/* Tabs - Made more compact */}
          <div className="flex space-x-1 bg-muted/20 rounded-md p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={12} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 h-[calc(100%-120px)] overflow-y-auto custom-scrollbar">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillSidebar;