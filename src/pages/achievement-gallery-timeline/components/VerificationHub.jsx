import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationHub = ({ achievements }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const verifiableAchievements = achievements?.filter(achievement => 
    achievement?.verificationUrl || achievement?.credentialId
  );

  const getVerificationStatus = (achievement) => {
    if (achievement?.validUntil) {
      const expiryDate = new Date(achievement.validUntil);
      const now = new Date();
      const daysUntilExpiry = Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry < 0) {
        return { status: 'expired', color: 'text-error', icon: 'AlertTriangle' };
      } else if (daysUntilExpiry < 30) {
        return { status: 'expiring', color: 'text-warning', icon: 'Clock' };
      }
    }
    return { status: 'valid', color: 'text-success', icon: 'CheckCircle' };
  };

  const contactInfo = {
    email: "esakki0720@gmail.com",
    phone: "+91 8838384624",
    linkedin: "https://www.linkedin.com/in/esakkiappan-e-b24893343?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6 mb-8"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-success to-emerald-600 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Verification Hub</h2>
            <p className="text-muted-foreground text-sm">Validate credentials and achievements</p>
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-success">{verifiableAchievements?.length}</div>
          <div className="text-sm text-muted-foreground">Verifiable</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-accent">
            {verifiableAchievements?.filter(a => getVerificationStatus(a)?.status === 'valid')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Valid</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-warning">
            {verifiableAchievements?.filter(a => getVerificationStatus(a)?.status === 'expiring')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Expiring Soon</div>
        </div>
        <div className="text-center p-3 bg-muted/20 rounded-lg">
          <div className="text-2xl font-bold text-error">
            {verifiableAchievements?.filter(a => getVerificationStatus(a)?.status === 'expired')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Expired</div>
        </div>
      </div>
      {/* Expanded Content */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        {isExpanded && (
          <div className="space-y-6">
            {/* Verifiable Achievements List */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Verifiable Achievements</h3>
              <div className="space-y-3">
                {verifiableAchievements?.map((achievement, index) => {
                  const verification = getVerificationStatus(achievement);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg border border-border">
                      <div className="flex items-center space-x-3">
                        <Icon name={verification?.icon} size={20} className={verification?.color} />
                        <div>
                          <h4 className="font-medium text-foreground">{achievement?.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement?.organization}</p>
                          {achievement?.credentialId && (
                            <p className="text-xs text-muted-foreground">ID: {achievement?.credentialId}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {achievement?.validUntil && (
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            verification?.status === 'expired' ? 'bg-error/20 text-error' :
                            verification?.status === 'expiring'? 'bg-warning/20 text-warning' : 'bg-success/20 text-success'
                          }`}>
                            {verification?.status === 'expired' ? 'Expired' :
                             verification?.status === 'expiring'? 'Expires Soon' : 'Valid'}
                          </span>
                        )}
                        {achievement?.verificationUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(achievement?.verificationUrl, '_blank')}
                            iconName="ExternalLink"
                            iconPosition="right"
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Contact Information for References */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact for References</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-foreground font-medium">{contactInfo?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={20} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="text-foreground font-medium">{contactInfo?.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Linkedin" size={20} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">LinkedIn</p>
                      <button
                        onClick={() => window.open(contactInfo?.linkedin, '_blank')}
                        className="text-foreground font-medium hover:text-accent transition-colors duration-200"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Github" size={20} className="text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">GitHub</p>
                      <button
                        onClick={() => window.open(contactInfo?.github, '_blank')}
                        className="text-foreground font-medium hover:text-accent transition-colors duration-200"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Verification Actions */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    const validAchievements = verifiableAchievements?.filter(a => 
                      getVerificationStatus(a)?.status === 'valid' && a?.verificationUrl
                    );
                    validAchievements?.forEach(achievement => {
                      window.open(achievement?.verificationUrl, '_blank');
                    });
                  }}
                  iconName="ExternalLink"
                  iconPosition="left"
                  disabled={verifiableAchievements?.filter(a => 
                    getVerificationStatus(a)?.status === 'valid' && a?.verificationUrl
                  )?.length === 0}
                >
                  Verify All Valid Certificates
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => {
                    const credentials = verifiableAchievements?.filter(a => a?.credentialId)?.map(a => `${a?.title}: ${a?.credentialId}`)?.join('\n');
                    navigator.clipboard?.writeText(credentials);
                  }}
                  iconName="Copy"
                  iconPosition="left"
                  disabled={verifiableAchievements?.filter(a => a?.credentialId)?.length === 0}
                >
                  Copy All Credential IDs
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open(`mailto:${contactInfo?.email}?subject=Reference Request&body=Hello, I would like to request a reference for the achievements listed on the portfolio.`, '_self')}
                  iconName="Mail"
                  iconPosition="left"
                >
                  Request Reference
                </Button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default VerificationHub;