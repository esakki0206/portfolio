import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AchievementCard = ({ achievement, index, isExpanded, onToggle }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Academic Excellence': return 'GraduationCap';
      case 'Certifications': return 'Award';
      case 'Competitions': return 'Trophy';
      case 'Recognition': return 'Star';
      default: return 'Medal';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Academic Excellence': return 'from-blue-500 to-indigo-600';
      case 'Certifications': return 'from-green-500 to-emerald-600';
      case 'Competitions': return 'from-yellow-500 to-orange-600';
      case 'Recognition': return 'from-purple-500 to-pink-600';
      default: return 'from-accent to-success';
    }
  };

  const getDifficultyBadge = (level) => {
    const colors = {
      'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
      'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Advanced': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      'Expert': 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return colors?.[level] || colors?.['Intermediate'];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Timeline Connector */}
      <div className="absolute left-8 top-16 w-0.5 h-full bg-gradient-to-b from-accent/50 to-transparent hidden lg:block"></div>
      {/* Timeline Node */}
      <div className="absolute left-6 top-8 w-4 h-4 bg-gradient-to-br from-accent to-success rounded-full border-2 border-background shadow-lg hidden lg:block timeline-node"></div>
      {/* Achievement Card */}
      <div className="lg:ml-16 mb-8">
        <motion.div
          className={`glass-card p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 ${
            isExpanded ? 'ring-2 ring-accent/50' : ''
          }`}
          whileHover={{ y: -5 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(achievement?.category)} rounded-lg flex items-center justify-center shadow-lg`}>
                <Icon name={getCategoryIcon(achievement?.category)} size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {achievement?.title}
                </h3>
                <p className="text-muted-foreground text-sm">{achievement?.organization}</p>
                <p className="text-accent text-sm font-medium">{achievement?.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {achievement?.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyBadge(achievement?.difficulty)}`}>
                  {achievement?.difficulty}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                className="text-muted-foreground hover:text-accent"
              >
                {isExpanded ? 'Less' : 'More'}
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mb-4">
            {achievement?.participants && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Users" size={16} />
                <span>{achievement?.participants?.toLocaleString()} participants</span>
              </div>
            )}
            {achievement?.ranking && (
              <div className="flex items-center space-x-2 text-sm text-success">
                <Icon name="Trophy" size={16} />
                <span>Rank #{achievement?.ranking}</span>
              </div>
            )}
            {achievement?.gpa && (
              <div className="flex items-center space-x-2 text-sm text-accent">
                <Icon name="TrendingUp" size={16} />
                <span>GPA: {achievement?.gpa}</span>
              </div>
            )}
            {achievement?.validUntil && (
              <div className="flex items-center space-x-2 text-sm text-warning">
                <Icon name="Calendar" size={16} />
                <span>Valid until {achievement?.validUntil}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {achievement?.description}
          </p>

          {/* Skills Tags */}
          {achievement?.skills && achievement?.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {achievement?.skills?.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-muted/50 text-muted-foreground rounded-full text-sm hover:bg-accent/20 hover:text-accent transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          {/* Verification Links */}
          {achievement?.verificationUrl && (
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(achievement?.verificationUrl, '_blank')}
                iconName="ExternalLink"
                iconPosition="right"
                className="magnetic-button"
              >
                Verify Certificate
              </Button>
              {achievement?.credentialId && (
                <span className="text-xs text-muted-foreground">
                  ID: {achievement?.credentialId}
                </span>
              )}
            </div>
          )}

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {isExpanded && (
              <div className="pt-4 border-t border-border space-y-4">
                {/* Project Image */}
                {achievement?.image && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted/20">
                    <Image
                      src={achievement?.image}
                      alt={achievement?.title}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Image" size={48} className="text-muted-foreground" />
                      </div>
                    )}
                  </div>
                )}

                {/* Detailed Description */}
                {achievement?.detailedDescription && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Project Details</h4>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {achievement?.detailedDescription}
                    </p>
                  </div>
                )}

                {/* Team Members */}
                {achievement?.teamMembers && achievement?.teamMembers?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Team Members</h4>
                    <div className="flex flex-wrap gap-2">
                      {achievement?.teamMembers?.map((member, memberIndex) => (
                        <span
                          key={memberIndex}
                          className="px-3 py-1 bg-card border border-border rounded-full text-sm text-foreground"
                        >
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Judge Feedback */}
                {achievement?.feedback && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Judge Feedback</h4>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                      "{achievement?.feedback}"
                    </blockquote>
                  </div>
                )}

                {/* Impact Metrics */}
                {achievement?.impact && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Project Impact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {achievement?.impact?.map((metric, metricIndex) => (
                        <div key={metricIndex} className="text-center p-3 bg-muted/20 rounded-lg">
                          <div className="text-2xl font-bold text-accent">{metric?.value}</div>
                          <div className="text-sm text-muted-foreground">{metric?.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Additional Links */}
                {(achievement?.githubUrl || achievement?.liveUrl || achievement?.documentUrl) && (
                  <div className="flex flex-wrap gap-2">
                    {achievement?.githubUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement?.githubUrl, '_blank')}
                        iconName="Github"
                        iconPosition="left"
                      >
                        View Code
                      </Button>
                    )}
                    {achievement?.liveUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement?.liveUrl, '_blank')}
                        iconName="ExternalLink"
                        iconPosition="left"
                      >
                        Live Demo
                      </Button>
                    )}
                    {achievement?.documentUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(achievement?.documentUrl, '_blank')}
                        iconName="FileText"
                        iconPosition="left"
                      >
                        Documentation
                      </Button>
                    )}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;