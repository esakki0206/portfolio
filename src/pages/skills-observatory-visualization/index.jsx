import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import SkillUniverse from './components/SkillUniverse';
import SkillSidebar from './components/SkillSidebar';
import SkillFilters from './components/SkillFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SkillsObservatoryVisualization = () => {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedView, setSelectedView] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Real skills from actual experience
  const allSkills = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      proficiency: 82,
      recentActivity: 90,
      experience: 'Used in production internship at Free Will Technologies',
      icon: 'Atom',
      color: 'from-blue-500 to-cyan-400',
      description:
        'Built the Resume Builder frontend using React. Comfortable with hooks, component composition, and state management.',
      certifications: [],
      projects: ['Resume Builder (Free Will Technologies)'],
      resources: ['React Docs', 'React Router'],
      satellites: [
        { name: 'Hooks', proficiency: 80 },
        { name: 'React Router', proficiency: 75 },
        { name: 'State Mgmt', proficiency: 70 },
      ],
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Frontend',
      proficiency: 78,
      recentActivity: 85,
      experience: 'Primary language for frontend web development',
      icon: 'Code2',
      color: 'from-yellow-500 to-orange-400',
      description:
        'Used JavaScript extensively in React projects. Comfortable with ES6+, async/await, and DOM manipulation.',
      certifications: [],
      projects: ['Resume Builder', 'Portfolio Website'],
      resources: ['MDN Web Docs', 'javascript.info'],
      satellites: [
        { name: 'ES6+', proficiency: 80 },
        { name: 'Async/Await', proficiency: 75 },
        { name: 'DOM APIs', proficiency: 78 },
      ],
    },
    {
      id: 'php',
      name: 'PHP',
      category: 'Backend',
      proficiency: 70,
      recentActivity: 80,
      experience: 'Used at Free Will Technologies internship for backend APIs',
      icon: 'Server',
      color: 'from-indigo-500 to-violet-400',
      description:
        'Built REST API endpoints for the Resume Builder backend using PHP. Handled form data, session management, and database operations.',
      certifications: [],
      projects: ['Resume Builder (Free Will Technologies)'],
      resources: ['PHP Manual', 'PHP: The Right Way'],
      satellites: [
        { name: 'REST APIs', proficiency: 72 },
        { name: 'Sessions', proficiency: 68 },
        { name: 'File Handling', proficiency: 65 },
      ],
    },
    {
      id: 'mysql',
      name: 'MySQL',
      category: 'Database',
      proficiency: 72,
      recentActivity: 75,
      experience: 'Used in internship and Database Systems coursework',
      icon: 'Database',
      color: 'from-orange-500 to-amber-400',
      description:
        'Designed the resume database schema during my internship, and studied relational database normalisation and advanced SQL in coursework.',
      certifications: [],
      projects: ['Resume Builder (Free Will Technologies)', 'E-commerce DB Design (Coursework)'],
      resources: ['MySQL Docs', 'Use The Index, Luke'],
      satellites: [
        { name: 'SQL Queries', proficiency: 75 },
        { name: 'Schema Design', proficiency: 70 },
        { name: 'Indexing', proficiency: 65 },
      ],
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Tools & Platforms',
      proficiency: 75,
      recentActivity: 90,
      experience: 'Daily version control across all projects',
      icon: 'GitBranch',
      color: 'from-orange-500 to-red-400',
      description:
        'Use Git daily for version control. Comfortable with branching, rebasing, pull requests, and collaborative workflows on GitHub.',
      certifications: [],
      projects: ['All Projects'],
      resources: ['Pro Git Book', 'GitHub Docs'],
      satellites: [
        { name: 'GitHub', proficiency: 80 },
        { name: 'Branching', proficiency: 75 },
        { name: 'Pull Requests', proficiency: 72 },
      ],
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Other',
      proficiency: 80,
      recentActivity: 75,
      experience: 'First language learned; used in ML coursework',
      icon: 'Code',
      color: 'from-green-500 to-emerald-400',
      description:
        'Started coding in Python. Used it for algorithms coursework, data analysis, and building the CIFAR-10 CNN image classifier.',
      certifications: [],
      projects: ['CIFAR-10 CNN Classifier', 'Algorithm Implementations'],
      resources: ['Python.org', 'Real Python'],
      satellites: [
        { name: 'NumPy', proficiency: 72 },
        { name: 'Pandas', proficiency: 68 },
        { name: 'Matplotlib', proficiency: 70 },
      ],
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      category: 'Other',
      proficiency: 65,
      recentActivity: 85,
      experience: 'Used in ML coursework to build CIFAR-10 CNN',
      icon: 'Brain',
      color: 'from-orange-600 to-red-400',
      description:
        'Built and trained a CNN achieving 94% accuracy on CIFAR-10 using TensorFlow/Keras, including data augmentation and batch normalisation.',
      certifications: [],
      projects: ['CIFAR-10 CNN Classifier'],
      resources: ['TensorFlow Docs', 'Deep Learning with Python'],
      satellites: [
        { name: 'Keras', proficiency: 68 },
        { name: 'CNNs', proficiency: 65 },
        { name: 'Data Augmentation', proficiency: 62 },
      ],
    },
    {
      id: 'arduino',
      name: 'Arduino / C++',
      category: 'Other',
      proficiency: 60,
      recentActivity: 70,
      experience: 'Built Budget-Friendly CCTV prototype at Innovathon',
      icon: 'Cpu',
      color: 'from-teal-500 to-cyan-400',
      description:
        'Programmed an ESP32-CAM module in C++ via the Arduino IDE to stream live MJPEG video over Wi-Fi for a hackathon project.',
      certifications: [],
      projects: ['Budget-Friendly CCTV (Innovathon)'],
      resources: ['Arduino Docs', 'ESP32 Programming Guide'],
      satellites: [
        { name: 'ESP32-CAM', proficiency: 65 },
        { name: 'Wi-Fi Streaming', proficiency: 60 },
        { name: 'Embedded C++', proficiency: 58 },
      ],
    },
    {
      id: 'algorithms',
      name: 'Algorithms',
      category: 'Other',
      proficiency: 82,
      recentActivity: 80,
      experience: 'Core coursework — Merge Sort, BFS, DFS, Dijkstra, DP',
      icon: 'Network',
      color: 'from-purple-500 to-pink-400',
      description:
        'Strong foundation in algorithmic thinking from coursework. Implemented and analysed sorting, graph, and dynamic programming algorithms.',
      certifications: [],
      projects: ['Algorithm Coursework', 'Data Structures Lab'],
      resources: ['CLRS', 'LeetCode'],
      satellites: [
        { name: 'Sorting', proficiency: 85 },
        { name: 'Graph Algos', proficiency: 80 },
        { name: 'Dynamic Prog.', proficiency: 75 },
      ],
    },
  ];

  // Check mobile
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
      (selectedView === 'mobile' && ['JavaScript', 'React'].includes(skill.name));

    return matchesSearch && matchesCategory && matchesView;
  });

  const categories = [...new Set(allSkills.map((s) => s.category))];

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    if (isMobile) setIsFilterPanelOpen(false);
  };

  const handleCloseSidebar = () => setSelectedSkill(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Filter Panel */}
        <motion.div
          className={`${
            isMobile
              ? `fixed left-0 top-16 h-full w-72 bg-card border-r border-border shadow-elevation-3 z-30 transform ${
                  isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-72 bg-card border-r border-border'
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

        {/* Main Content */}
        <div className="flex-1 relative">
          {/* Mobile Filter Toggle */}
          {isMobile && (
            <Button
              variant="default"
              size="icon"
              className="fixed top-20 left-4 z-20 neon-glow-hover"
              onClick={() => setIsFilterPanelOpen(true)}
              iconName="Filter"
            />
          )}

          {/* Universe Visualisation */}
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

          {/* Stats Overlay */}
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

          {/* Empty State */}
          {filteredSkills.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Skills Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedView('all');
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Skill Details Sidebar */}
        {selectedSkill && (
          <SkillSidebar
            selectedSkill={selectedSkill}
            onClose={handleCloseSidebar}
            skillProgressData={{}}
          />
        )}

        {/* Mobile Overlay */}
        {isMobile && isFilterPanelOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={() => setIsFilterPanelOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SkillsObservatoryVisualization;
