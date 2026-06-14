import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';
import { achievementsData } from '../../data/achievementsData';

const AchievementGalleryTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCards, setExpandedCards]       = useState(new Set());

  const achievements = achievementsData;

  // Categories with counts
  const categories = useMemo(() => {
    const map = {};
    achievements.forEach((a) => {
      map[a.category] = (map[a.category] || 0) + 1;
    });
    return Object.entries(map).map(([name, count]) => ({
      name,
      count,
      icon:
        name === 'Academic Excellence' ? 'GraduationCap'
        : name === 'Experience'        ? 'Briefcase'
        : name === 'Competitions'      ? 'Trophy'
        : name === 'Certifications'    ? 'Award'
        : name === 'Projects'          ? 'Code2'
        : 'Star',
    }));
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    let list = selectedCategory === 'all'
      ? [...achievements]
      : achievements.filter((a) => a.category === selectedCategory);
    list.sort((a, b) => new Date(b.date) - new Date(a.date));
    return list;
  }, [achievements, selectedCategory]);

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Achievements — Esakkiappan Portfolio</title>
        <meta
          name="description"
          content="Real milestones: hackathon wins, competition prizes, NPTEL & Coursera certifications, production internship, and consistent academic excellence."
        />
      </Helmet>

      <Header />

      <main className="pt-16 flex-1">
        {/* ── Hero ── */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                {[
                  { gradient: 'from-yellow-500 to-orange-600', icon: 'Trophy'  },
                  { gradient: 'from-blue-500  to-indigo-600', icon: 'Award'   },
                  { gradient: 'from-green-500 to-emerald-600',icon: 'Star'    },
                ].map(({ gradient, icon }) => (
                  <div
                    key={icon}
                    className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shadow-2xl`}
                  >
                    <Icon name={icon} size={28} className="text-white" />
                  </div>
                ))}
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Real</span>
                <br />
                <span className="text-foreground">Milestones</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Every entry here is earned — from hackathon wins and inter-college prizes
                to NPTEL certifications and a production internship. No fabrications, only real results.
              </p>

              <Button
                variant="default"
                size="lg"
                onClick={() => document.getElementById('achievements-section')?.scrollIntoView({ behavior: 'smooth' })}
                iconName="ArrowDown"
                iconPosition="right"
                className="magnetic-button neon-glow-hover"
              >
                Explore Milestones
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StatsOverview achievements={achievements} />
          </div>
        </section>

        {/* ── Achievements Grid ── */}
        <section id="achievements-section" className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              totalCount={achievements.length}
              filteredCount={filteredAchievements.length}
            />

            {filteredAchievements.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {filteredAchievements.map((achievement, index) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    index={index}
                    isExpanded={expandedCards.has(achievement.id)}
                    onToggle={() => toggleCardExpansion(achievement.id)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Icon name="Search" size={64} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No milestones found</h3>
                <p className="text-muted-foreground mb-6">Try adjusting your filters.</p>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory('all')}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-card/50 to-background">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to <span className="text-gradient">Collaborate</span>?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                These milestones reflect my commitment to learning through doing. Let's discuss how
                I can contribute to your next project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')}
                  iconName="Linkedin"
                  iconPosition="left"
                  className="magnetic-button neon-glow-hover"
                >
                  Connect on LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => (window.location.href = '/projects')}
                  iconName="Code2"
                  iconPosition="left"
                  className="magnetic-button"
                >
                  View Projects
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AchievementGalleryTimeline;
