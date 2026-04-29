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

  // Real skills from actual experience — detailed data for sidebar
  const allSkills = [
    {
      id: 'react',
      name: 'React',
      category: 'Frontend',
      proficiency: 82,
      recentActivity: 90,
      experience: '1+ year hands-on — production internship at Free Will Technologies building real-world applications',
      icon: 'Atom',
      color: 'from-blue-500 to-cyan-400',
      description:
        'Core frontend technology used to build the Resume Builder web app during internship at Free Will Technologies. Proficient in functional components, custom hooks, context API, and React Router for SPA navigation. Applied component-driven architecture, lazy loading, and optimised re-renders with React.memo and useMemo for production performance.',
      certifications: [],
      projects: [
        'Resume Builder — Full-stack web app (Free Will Technologies internship)',
        'Portfolio Website — Interactive skills observatory with canvas animations',
        'Saree E-Commerce — Product catalogue with cart & checkout flow',
        'Online Book Shop — MERN stack bookstore with search & filtering',
      ],
      resources: ['React Official Docs', 'React Router v6 Guide', 'Kent C. Dodds Blog', 'React Patterns by Michael Chan'],
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
      experience: '1.5+ years — primary language for all frontend development and interactive projects',
      icon: 'Code2',
      color: 'from-yellow-500 to-orange-400',
      description:
        'Primary programming language for web development. Strong command of ES6+ features including destructuring, spread/rest operators, template literals, arrow functions, and modules. Experienced with async/await patterns, Fetch API, and Promises for API integration. Applied DOM manipulation, event delegation, and browser APIs in production code.',
      certifications: [],
      projects: [
        'Resume Builder — Dynamic form handling & PDF generation',
        'Portfolio Website — Canvas-based particle systems & RAF animations',
        'Gift Shop E-Commerce — Interactive cart & real-time price calculation',
        'FWT iZON LMS — Course player with progress tracking',
      ],
      resources: ['MDN Web Docs', 'javascript.info', 'You Don\'t Know JS (Book Series)', 'Eloquent JavaScript'],
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
      experience: '6+ months — backend API development during production internship at Free Will Technologies',
      icon: 'Server',
      color: 'from-indigo-500 to-violet-400',
      description:
        'Built robust REST API endpoints for the Resume Builder backend. Implemented secure form data processing, session-based authentication, file upload handling, and CRUD operations with prepared statements to prevent SQL injection. Structured code using MVC-inspired architecture for maintainability.',
      certifications: [],
      projects: [
        'Resume Builder Backend — REST API with authentication & file management',
        'E-commerce Admin Panel — Product CRUD operations & order management',
      ],
      resources: ['PHP Official Manual', 'PHP: The Right Way', 'Laravel Documentation', 'PHP-FIG PSR Standards'],
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
      experience: '1+ year — internship database design and advanced Database Systems coursework',
      icon: 'Database',
      color: 'from-orange-500 to-amber-400',
      description:
        'Designed and normalised the resume database schema (3NF) during internship, handling user profiles, templates, and generated documents. Studied relational algebra, query optimisation, indexing strategies, and transaction management in coursework. Proficient in complex JOINs, subqueries, aggregate functions, and stored procedures.',
      certifications: ['Data Science for Engineers — NPTEL'],
      projects: [
        'Resume Builder Database — Multi-table schema with foreign key constraints',
        'E-commerce DB Design — Normalised product-order-user schema (Coursework)',
        'Library Management System — Stored procedures & triggers (Lab Project)',
      ],
      resources: ['MySQL 8.0 Reference Manual', 'Use The Index, Luke', 'Database Design for Mere Mortals', 'Stanford DB Course (Coursera)'],
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
      experience: '1.5+ years — daily version control across all academic and professional projects',
      icon: 'GitBranch',
      color: 'from-orange-500 to-red-400',
      description:
        'Daily-driver for version control across all projects. Comfortable with branching strategies (feature branches, GitFlow), interactive rebasing, cherry-picking, stashing, and resolving merge conflicts. Use GitHub for collaborative workflows including pull requests, code reviews, issue tracking, and CI/CD pipeline triggers.',
      certifications: [],
      projects: [
        'All Production Projects — Version-controlled with meaningful commit history',
        'Open Source Contributions — Pull request workflows on GitHub',
        'Team Collaboration — Branch management during internship',
      ],
      resources: ['Pro Git Book (Scott Chacon)', 'GitHub Docs', 'Atlassian Git Tutorials', 'Oh My Git! (Interactive Game)'],
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
      experience: '2+ years — first language learned; used extensively in ML, algorithms, and data analysis coursework',
      icon: 'Code',
      color: 'from-green-500 to-emerald-400',
      description:
        'First programming language — strong foundation in OOP, data structures, and algorithmic problem-solving. Used extensively for machine learning with TensorFlow/Keras, data analysis with Pandas/NumPy, and visualisation with Matplotlib/Seaborn. Built the CIFAR-10 CNN classifier achieving 94% accuracy. Comfortable with virtual environments, pip, and Jupyter notebooks.',
      certifications: ['Python for Data Science — NPTEL', 'Data Analysis using Python'],
      projects: [
        'CIFAR-10 CNN Classifier — 94% accuracy image classification model',
        'Algorithm Implementations — Sorting, graph traversal, and DP solutions',
        'Data Analysis Projects — Pandas & Matplotlib-based EDA notebooks',
        'Automation Scripts — File processing & web scraping utilities',
      ],
      resources: ['Python.org Official Docs', 'Real Python', 'Automate the Boring Stuff', 'Python Crash Course (Eric Matthes)'],
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
      experience: '6+ months — ML coursework and hands-on CNN development with real-world datasets',
      icon: 'Brain',
      color: 'from-orange-600 to-red-400',
      description:
        'Built and trained a Convolutional Neural Network achieving 94% test accuracy on the CIFAR-10 dataset (60,000 images, 10 classes). Applied data augmentation (random flipping, rotation, zoom), batch normalisation, dropout regularisation, and learning rate scheduling. Proficient with Keras Sequential and Functional APIs, model evaluation metrics, and TensorBoard visualisation.',
      certifications: ['Data Science for Engineers — NPTEL'],
      projects: [
        'CIFAR-10 CNN Classifier — Multi-layer CNN with 94% accuracy',
        'Image Data Augmentation Pipeline — Custom preprocessing with tf.data',
        'Model Performance Analysis — Confusion matrices & training curves',
      ],
      resources: ['TensorFlow Official Docs', 'Deep Learning with Python (François Chollet)', 'Stanford CS231n Lectures', 'Kaggle Learn — Intro to Deep Learning'],
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
      experience: 'Hackathon project — built a functional Budget-Friendly CCTV prototype at Innovathon',
      icon: 'Cpu',
      color: 'from-teal-500 to-cyan-400',
      description:
        'Programmed an ESP32-CAM module in C++ via the Arduino IDE to stream live MJPEG video over Wi-Fi for a hackathon project. Configured GPIO pins, handled Wi-Fi connectivity with reconnection logic, implemented MJPEG frame buffering, and optimised memory usage on the resource-constrained microcontroller. Integrated with a mobile-responsive web viewer.',
      certifications: ['Intra-College Hackathon — 1st Place (₹2,000 Prize)'],
      projects: [
        'Budget-Friendly CCTV — ESP32-CAM live video streaming over Wi-Fi',
        'IoT Sensor Dashboard — Temperature & humidity monitoring prototype',
      ],
      resources: ['Arduino Official Docs', 'ESP32 Programming Guide (Espressif)', 'Random Nerd Tutorials', 'Embedded Systems — University Coursework'],
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
      experience: '1.5+ years — core CS coursework covering sorting, graphs, dynamic programming, and complexity analysis',
      icon: 'Network',
      color: 'from-purple-500 to-pink-400',
      description:
        'Strong theoretical and practical foundation in algorithms and data structures from university coursework. Implemented and analysed time/space complexity of sorting algorithms (Merge Sort, Quick Sort, Heap Sort), graph algorithms (BFS, DFS, Dijkstra, Kruskal), and dynamic programming solutions (knapsack, LCS, matrix chain). Regular LeetCode practice for competitive problem-solving.',
      certifications: ['Programming in Java — NPTEL', '1st Rank Holder — Semesters 1-5'],
      projects: [
        'Algorithm Implementations — 30+ algorithms coded from scratch in Python',
        'Data Structures Lab — Linked lists, trees, heaps, hash tables',
        'LeetCode Practice — 100+ problems solved across difficulty levels',
        'Complexity Analysis Reports — Big-O analysis for coursework assignments',
      ],
      resources: ['CLRS (Introduction to Algorithms)', 'LeetCode', 'GeeksforGeeks', 'MIT OpenCourseWare 6.006'],
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
            skillProgressData={{
              react: [
                { label: 'Started React basics', date: 'Jan 2025', value: 15 },
                { label: 'Built first components', date: 'Mar 2025', value: 35 },
                { label: 'Hooks & Router mastery', date: 'May 2025', value: 55 },
                { label: 'Internship production app', date: 'Aug 2025', value: 72 },
                { label: 'Portfolio & E-commerce builds', date: 'Jan 2026', value: 80 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 82 },
              ],
              javascript: [
                { label: 'First JS scripts', date: 'Oct 2024', value: 10 },
                { label: 'DOM manipulation projects', date: 'Jan 2025', value: 30 },
                { label: 'ES6+ & async patterns', date: 'Apr 2025', value: 50 },
                { label: 'Production API integration', date: 'Jul 2025', value: 65 },
                { label: 'Canvas animations & RAF', date: 'Dec 2025', value: 74 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 78 },
              ],
              php: [
                { label: 'PHP syntax & basics', date: 'Mar 2025', value: 12 },
                { label: 'Form handling & sessions', date: 'May 2025', value: 35 },
                { label: 'REST API development', date: 'Jul 2025', value: 55 },
                { label: 'Internship backend work', date: 'Sep 2025', value: 65 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 70 },
              ],
              mysql: [
                { label: 'Basic SQL queries', date: 'Feb 2025', value: 15 },
                { label: 'Schema design coursework', date: 'May 2025', value: 38 },
                { label: 'Internship DB design', date: 'Aug 2025', value: 58 },
                { label: 'Advanced SQL & indexing', date: 'Nov 2025', value: 68 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 72 },
              ],
              git: [
                { label: 'First commits & push', date: 'Oct 2024', value: 10 },
                { label: 'Branching & merging', date: 'Feb 2025', value: 35 },
                { label: 'Team collaboration (internship)', date: 'Jun 2025', value: 55 },
                { label: 'Rebasing & PR workflows', date: 'Oct 2025', value: 68 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 75 },
              ],
              python: [
                { label: 'First Python program', date: 'Jun 2024', value: 10 },
                { label: 'OOP & data structures', date: 'Oct 2024', value: 30 },
                { label: 'Algorithms coursework', date: 'Feb 2025', value: 50 },
                { label: 'ML & data analysis', date: 'Jun 2025', value: 65 },
                { label: 'CIFAR-10 CNN project', date: 'Oct 2025', value: 76 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 80 },
              ],
              tensorflow: [
                { label: 'ML fundamentals', date: 'May 2025', value: 10 },
                { label: 'First Keras models', date: 'Jul 2025', value: 28 },
                { label: 'CNN architecture study', date: 'Sep 2025', value: 45 },
                { label: 'CIFAR-10 — 94% accuracy', date: 'Nov 2025', value: 60 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 65 },
              ],
              arduino: [
                { label: 'Arduino IDE setup', date: 'Jul 2025', value: 10 },
                { label: 'Basic C++ & GPIO', date: 'Aug 2025', value: 30 },
                { label: 'ESP32-CAM streaming', date: 'Sep 2025', value: 50 },
                { label: 'Innovathon hackathon demo', date: 'Oct 2025', value: 58 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 60 },
              ],
              algorithms: [
                { label: 'Basic sorting algorithms', date: 'Jun 2024', value: 15 },
                { label: 'Recursion & divide-conquer', date: 'Oct 2024', value: 35 },
                { label: 'Graph algorithms (BFS/DFS)', date: 'Feb 2025', value: 55 },
                { label: 'Dynamic programming', date: 'Jun 2025', value: 70 },
                { label: 'LeetCode practice (100+)', date: 'Nov 2025', value: 78 },
                { label: 'Current proficiency', date: 'Apr 2026', value: 82 },
              ],
            }}
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
