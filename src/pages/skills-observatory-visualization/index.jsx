import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import SkillUniverse from './components/SkillUniverse';
import SkillSidebar from './components/SkillSidebar';
import SkillFilters from './components/SkillFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { allSkills, skillProgressData } from '../../data/skillsData';

const SkillsObservatoryVisualization = () => {
  const [selectedSkill, setSelectedSkill]         = useState(null);
  const [hoveredSkill, setHoveredSkill]           = useState(null);
  const [selectedView, setSelectedView]           = useState('all');
  const [searchTerm, setSearchTerm]               = useState('');
  const [selectedCategory, setSelectedCategory]   = useState('all');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isMobile, setIsMobile]                   = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredSkills = allSkills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || skill.category === selectedCategory;

    const matchesView =
      selectedView === 'all' ||
      (selectedView === 'fullstack' &&
        ['Frontend', 'Backend', 'Database'].includes(skill.category)) ||
      (selectedView === 'datascience' &&
        ['Python', 'TensorFlow', 'MySQL'].includes(skill.name)) ||
      (selectedView === 'devops' && ['Tools & Platforms'].includes(skill.category)) ||
      (selectedView === 'mobile' &&
        ['JavaScript', 'React', 'React Native', 'Kotlin'].includes(skill.name));

    return matchesSearch && matchesCategory && matchesView;
  });

  const categories = [...new Set(allSkills.map((s) => s.category))];

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    if (isMobile) setIsFilterPanelOpen(false);
  };

  const handleCloseSidebar = () => setSelectedSkill(null);

  // Use dvh (dynamic viewport height) on mobile, regular screen height on desktop.
  // This avoids the iOS Safari address-bar bug where 100vh overflows.
  const canvasHeightClass = isMobile
    ? 'h-[calc(100dvh-4rem)]'
    : 'h-[calc(100vh-4rem)]';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Skills — Esakkiappan Portfolio</title>
        <meta
          name="description"
          content="Interactive skills observatory: React, Python, TensorFlow, PHP, MySQL, and more — with proficiency levels and learning timelines."
        />
        <meta property="og:title" content="Skills — Esakkiappan Portfolio" />
        <meta property="og:description" content="Interactive skills visualization with proficiency tracking." />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      {/* Observatory layout — fixed height panel below header */}
      <div className={`flex flex-1 ${canvasHeightClass} mt-16 overflow-hidden`}>

        {/* ── Filter Panel ── */}
        <motion.div
          className={`${
            isMobile
              ? `fixed left-0 top-16 h-full w-72 bg-card border-r border-border shadow-elevation-3 z-30 ${
                  isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-72 bg-card border-r border-border shrink-0'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-gradient">Skills</h1>
                <p className="text-sm text-muted-foreground">Interactive visualisation</p>
              </div>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFilterPanelOpen(false)}
                  iconName="X"
                />
              )}
            </div>

            <SkillFilters
              selectedView={selectedView}
              onViewChange={setSelectedView}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </div>
        </motion.div>

        {/* ── Main Canvas ── */}
        <div className="flex-1 relative overflow-hidden">
          {/* Mobile filter toggle */}
          {isMobile && (
            <Button
              variant="default"
              size="icon"
              className="fixed top-20 left-4 z-20 neon-glow-hover"
              onClick={() => setIsFilterPanelOpen(true)}
              iconName="Filter"
            />
          )}

          <div className="h-full">
            <SkillUniverse
              skills={filteredSkills}
              selectedSkill={selectedSkill}
              onSkillSelect={handleSkillSelect}
              hoveredSkill={hoveredSkill}
              onSkillHover={setHoveredSkill}
              selectedView={selectedView}
              isMobile={isMobile}
            />
          </div>

          {/* Stats overlay */}
          {filteredSkills.length > 0 && (
            <div className="absolute top-4 right-4 glass-card p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{filteredSkills.length}</div>
                <div className="text-xs text-muted-foreground">Skills</div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-lg font-semibold text-success">
                  {Math.round(
                    filteredSkills.reduce((acc, s) => acc + s.proficiency, 0) /
                      filteredSkills.length
                  )}%
                </div>
                <div className="text-xs text-muted-foreground">Avg Proficiency</div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredSkills.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Skills Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedView('all'); }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Skill Detail Sidebar ── */}
        {selectedSkill && (
          <SkillSidebar
            selectedSkill={selectedSkill}
            onClose={handleCloseSidebar}
            skillProgressData={skillProgressData}
          />
        )}

        {/* Mobile backdrop for filter panel */}
        {isMobile && isFilterPanelOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setIsFilterPanelOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>

      <Footer variant="minimal" />
    </div>
  );
};

export default SkillsObservatoryVisualization;
