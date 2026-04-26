import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import FilterBar from './components/FilterBar';
import StatsOverview from './components/StatsOverview';

const AchievementGalleryTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Real achievements based on actual experience
  const achievements = [
    {
      id: 1,
      title: 'Full-Stack Internship — Free Will Technologies',
      category: 'Experience',
      organization: 'Free Will Technologies',
      date: 'Spring 2024',
      description:
        'Completed a full-stack internship at Free Will Technologies, building a production web-based Resume Builder using React, PHP, and MySQL. The application is live at resumebuilder.freewilltech.in.',
      skills: ['React', 'PHP', 'MySQL', 'REST API', 'Responsive Design', 'Full-Stack'],
      image:
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop',
      detailedDescription: `During this internship at Free Will Technologies (a growing startup focused on business automation tools), I single-handedly developed a web-based Resume Builder application that is now in live production.

Key responsibilities:
• Designed and built a responsive React frontend with live resume preview
• Implemented PHP REST API endpoints for CRUD operations on user resumes
• Designed the MySQL database schema for storing dynamic resume data
• Participated in daily code reviews with senior developers
• Deployed and maintained the application on the company server

Outcome: The Resume Builder is live at resumebuilder.freewilltech.in and used by real users.`,
      liveUrl: 'https://resumebuilder.freewilltech.in/',
      impact: [
        { value: 'Live', label: 'Production App' },
        { value: 'React', label: 'Frontend' },
        { value: 'PHP/MySQL', label: 'Backend' },
      ],
    },
    {
      id: 2,
      title: 'Innovathon — Budget-Friendly CCTV Prototype',
      category: 'Competitions',
      organization: "St. Joseph's College Innovathon",
      date: 'Summer 2024',
      description:
        "Participated in a university Innovathon and built a Budget-Friendly CCTV prototype using ESP32-CAM and the Arduino IDE. Delivered a working hardware prototype that streams live video over Wi-Fi for under ₹500.",
      skills: ['Arduino IDE', 'ESP32-CAM', 'C++', 'IoT', 'Wi-Fi Streaming', 'Rapid Prototyping'],
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop',
      detailedDescription: `Worked in a team of four first-year students to design and build a low-cost surveillance prototype for the university Innovathon.

Project highlights:
• Programmed the ESP32-CAM module in C++ using the Arduino IDE
• Implemented an MJPEG HTTP server so the live feed could be viewed on any browser
• Achieved a fully functional prototype with Wi-Fi auto-reconnect for under ₹500 in components
• Presented to a panel of faculty judges; received commendation for practical innovation
• Demonstrated how open-source hardware can democratise security technology

This was my first hands-on hardware project and it sparked a strong interest in IoT and embedded systems.`,
      impact: [
        { value: '< ₹500', label: 'Total Cost' },
        { value: 'Live', label: 'Video Stream' },
        { value: 'IoT', label: 'Domain' },
      ],
    },
    {
      id: 3,
      title: 'Academic Excellence — 8.5 GPA',
      category: 'Academic Excellence',
      organization: "St. Joseph's College (Autonomous)",
      date: '2023 – Present',
      description:
        'Maintaining an 8.5 GPA while pursuing a B.Sc. Computer Science degree and simultaneously working on internships, hackathons, and personal projects.',
      skills: [
        'Data Structures',
        'Algorithms',
        'Database Systems',
        'Machine Learning',
        'Computer Networks',
        'Numerical Methods',
      ],
      image:
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=400&fit=crop',
      detailedDescription: `Pursuing a B.Sc. Computer Science degree at St. Joseph's College (Autonomous) with a consistent GPA of 8.5.

Key coursework completed:
• Data Structures and Algorithms — implemented Merge Sort, Quick Sort, BFS, DFS, Dijkstra's
• Database Systems — designed and normalised an e-commerce database; improved query performance by 40% via indexing
• Numerical Methods — applied iterative solvers and interpolation methods
• Python Programming — built automation scripts and data analysis pipelines
• Machine Learning (ongoing) — training CNNs, implementing regression and classification models

Beyond academics, I balance studies with real-world projects and collaborative work, which has strengthened both my technical and time-management skills.`,
      impact: [
        { value: '8.5', label: 'GPA' },
        { value: 'B.Sc. CS', label: 'Degree' },
        { value: '2023–Now', label: 'Duration' },
      ],
    },
    {
      id: 4,
      title: 'CIFAR-10 CNN — 94% Test Accuracy',
      category: 'Projects',
      organization: "St. Joseph's College — ML Coursework",
      date: 'Fall 2024',
      description:
        'Built a Convolutional Neural Network in TensorFlow/Keras that achieved 94% test accuracy on the CIFAR-10 benchmark, using data augmentation, batch normalisation, and dropout regularisation.',
      skills: ['Python', 'TensorFlow', 'Keras', 'CNNs', 'Data Augmentation', 'NumPy'],
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
      detailedDescription: `Designed and trained a multi-layer CNN as part of advanced Machine Learning coursework.

Architecture highlights:
• Two convolutional blocks (Conv2D → BatchNorm → MaxPool → Dropout)
• Dense classifier with 512 units and 50% dropout
• Data augmentation: random horizontal flips, width/height shifts, brightness variation
• Adam optimiser with a cosine-decay learning rate schedule
• Trained for 50 epochs on a CPU-GPU split

Results:
• Training accuracy: 97.2%
• Test accuracy:     94.0%
• Training time:     ~45 minutes on GPU

Visualisations included per-class confusion matrix and sample misclassified images to understand model weaknesses.`,
      impact: [
        { value: '94%', label: 'Test Accuracy' },
        { value: '10', label: 'Classes' },
        { value: 'TensorFlow', label: 'Framework' },
      ],
    },
    {
      id: 5,
      title: 'High School Academic Excellence — 80%',
      category: 'Academic Excellence',
      organization: 'High School',
      date: '2008 – 2023',
      description:
        'Graduated high school with an 80% aggregate, finishing in the top 10% of the class. Specialised in STEM subjects and had early exposure to programming and computer science.',
      skills: ['Mathematics', 'Physics', 'Computer Science', 'STEM', 'Problem Solving'],
      image:
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
      detailedDescription: `Completed secondary and higher secondary education with a strong focus on STEM disciplines.

Academic highlights:
• 80% aggregate — top 10% of graduating class
• Computer Science elective: scored 92% — first introduction to programming logic and algorithms
• Mathematics: scored 88% — strong foundation in algebra, calculus, and statistics
• Physics: scored 85% — developed strong analytical reasoning skills

Beyond academics:
• Started self-teaching Python and HTML during free periods
• Completed first "Hello, World!" in Python during this period — sparked a lifelong passion for coding
• Participated in school-level science exhibitions

This foundation directly enabled my smooth transition into a demanding Computer Science degree.`,
      impact: [
        { value: '80%', label: 'Aggregate' },
        { value: 'Top 10%', label: 'Rank' },
        { value: 'Class of 2023', label: 'Graduation' },
      ],
    },
  ];

  // Categories with counts
  const categories = useMemo(() => {
    const categoryMap = {};
    achievements.forEach((a) => {
      categoryMap[a.category] = (categoryMap[a.category] || 0) + 1;
    });
    return Object.entries(categoryMap).map(([name, count]) => ({
      name,
      count,
      icon:
        name === 'Academic Excellence'
          ? 'GraduationCap'
          : name === 'Experience'
          ? 'Briefcase'
          : name === 'Competitions'
          ? 'Trophy'
          : name === 'Projects'
          ? 'Code2'
          : 'Star',
    }));
  }, [achievements]);

  // Filter and sort
  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((a) => a.category === selectedCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(lower) ||
          a.description.toLowerCase().includes(lower) ||
          a.organization.toLowerCase().includes(lower) ||
          (a.skills && a.skills.some((s) => s.toLowerCase().includes(lower)))
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

    return filtered;
  }, [achievements, selectedCategory, searchTerm, sortBy]);

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Achievements — Esakkiappan Portfolio</title>
        <meta
          name="description"
          content="Real milestones: internship experience, hackathon participation, academic excellence, and project achievements."
        />
      </Helmet>
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/20"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Trophy" size={32} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Briefcase" size={32} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Star" size={32} className="text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Real</span>
                <br />
                <span className="text-foreground">Milestones</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                Every entry here is earned, not fabricated — from my internship in production
                development to hackathon hardware prototyping and academic excellence throughout
                my Computer Science journey.
              </p>

              <Button
                variant="default"
                size="lg"
                onClick={() =>
                  document
                    .getElementById('achievements-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                iconName="ArrowDown"
                iconPosition="right"
                className="magnetic-button neon-glow-hover"
              >
                Explore Milestones
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StatsOverview achievements={achievements} />
          </div>
        </section>

        {/* Achievements Timeline */}
        <section id="achievements-section" className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalCount={achievements.length}
              filteredCount={filteredAchievements.length}
            />

            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-success to-accent/20 hidden lg:block"></div>

              {filteredAchievements.length > 0 ? (
                <div className="space-y-0">
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No milestones found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchTerm('');
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Reset Filters
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
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
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                These milestones reflect my commitment to learning through doing. Let's discuss how
                I can contribute to your next project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/in/esakkiappan-e-b24893343',
                      '_blank'
                    )
                  }
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

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center">
                <span className="text-background font-bold text-xs">EA</span>
              </div>
              <span className="text-foreground font-semibold">Esakkiappan E</span>
            </div>

            <div className="flex items-center space-x-6">
              <button
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/esakkiappan-e-b24893343',
                    '_blank'
                  )
                }
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Icon name="Linkedin" size={20} />
              </button>
              <button
                onClick={() =>
                  window.open('mailto:esakkiappan@example.com', '_self')
                }
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="Email"
              >
                <Icon name="Mail" size={20} />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Esakkiappan E. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AchievementGalleryTimeline;
