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

  // Mock skills data
  const allSkills = [
    {
      id: 'javascript',
      name: 'JavaScript',
      category: 'Programming Languages',
      proficiency: 95,
      recentActivity: 85,
      experience: '4+ years of intensive development',
      icon: 'Code2',
      color: 'from-yellow-500 to-orange-400',
      description: `Advanced JavaScript developer with expertise in ES6+, async programming, and modern frameworks. Experienced in both frontend and backend development with Node.js.`,
      certifications: ['JavaScript Algorithms', 'Advanced ES6'],
      projects: ['E-commerce Platform', 'Real-time Chat App', 'Task Management System', 'Weather Dashboard'],
      resources: ['MDN Web Docs', 'JavaScript.info', 'You Don\'t Know JS'],
      satellites: [
        { name: 'ES6+', proficiency: 90 },
        { name: 'Async/Await', proficiency: 85 },
        { name: 'DOM Manipulation', proficiency: 95 }
      ]
    },
    {
      id: 'react',
      name: 'React',
      category: 'Frameworks',
      proficiency: 92,
      recentActivity: 90,
      experience: '3+ years building scalable applications',
      icon: 'Atom',
      color: 'from-blue-500 to-cyan-400',
      description: `Expert React developer specializing in hooks, context API, and performance optimization. Built multiple production applications with complex state management.`,
      certifications: ['React Developer Certification', 'Advanced React Patterns'],
      projects: ['Portfolio Website', 'Social Media Dashboard', 'E-learning Platform'],
      resources: ['React Documentation', 'React Patterns', 'Testing Library'],
      satellites: [
        { name: 'Hooks', proficiency: 95 },
        { name: 'Context API', proficiency: 88 },
        { name: 'Redux', proficiency: 85 }
      ]
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Programming Languages',
      proficiency: 88,
      recentActivity: 75,
      experience: '3+ years in data science and web development',
      icon: 'Code',
      color: 'from-green-500 to-emerald-400',
      description: `Versatile Python developer with experience in web development, data analysis, and machine learning. Proficient in Django, Flask, and scientific computing libraries.`,
      certifications: ['Python Institute PCAP', 'Data Science with Python'],
      projects: ['Data Analysis Dashboard', 'ML Prediction Model', 'Web Scraping Tool'],
      resources: ['Python.org', 'Real Python', 'Automate the Boring Stuff'],
      satellites: [
        { name: 'Django', proficiency: 80 },
        { name: 'Pandas', proficiency: 85 },
        { name: 'NumPy', proficiency: 82 }
      ]
    },
    {
      id: 'nodejs',
      name: 'Node.js',
      category: 'Frameworks',
      proficiency: 85,
      recentActivity: 80,
      experience: '2+ years building server-side applications',
      icon: 'Server',
      color: 'from-green-600 to-lime-400',
      description: `Backend developer with Node.js expertise in building RESTful APIs, microservices, and real-time applications using Express.js and Socket.io.`,
      certifications: ['Node.js Application Developer'],
      projects: ['REST API Server', 'Real-time Chat Backend', 'Microservices Architecture'],
      resources: ['Node.js Docs', 'Express.js Guide', 'Node.js Best Practices'],
      satellites: [
        { name: 'Express.js', proficiency: 90 },
        { name: 'Socket.io', proficiency: 75 },
        { name: 'MongoDB', proficiency: 80 }
      ]
    },
    {
      id: 'git',
      name: 'Git',
      category: 'Tools',
      proficiency: 90,
      recentActivity: 95,
      experience: '4+ years of version control mastery',
      icon: 'GitBranch',
      color: 'from-orange-500 to-red-400',
      description: `Advanced Git user with expertise in branching strategies, merge conflict resolution, and collaborative workflows. Experienced with GitHub, GitLab, and Bitbucket.`,
      certifications: ['Git Version Control'],
      projects: ['Open Source Contributions', 'Team Collaboration Projects'],
      resources: ['Pro Git Book', 'Atlassian Git Tutorials', 'GitHub Learning Lab'],
      satellites: [
        { name: 'GitHub', proficiency: 95 },
        { name: 'GitLab', proficiency: 80 },
        { name: 'Branching', proficiency: 90 }
      ]
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'Tools',
      proficiency: 78,
      recentActivity: 70,
      experience: '2+ years containerizing applications',
      icon: 'Package',
      color: 'from-blue-600 to-indigo-400',
      description: `Container technology specialist with experience in Docker containerization, multi-stage builds, and Docker Compose for development environments.`,
      certifications: ['Docker Certified Associate'],
      projects: ['Containerized Web Apps', 'Development Environment Setup'],
      resources: ['Docker Documentation', 'Docker Deep Dive', 'Container Best Practices'],
      satellites: [
        { name: 'Docker Compose', proficiency: 85 },
        { name: 'Dockerfile', proficiency: 80 },
        { name: 'Container Registry', proficiency: 70 }
      ]
    },
    {
      id: 'aws',
      name: 'AWS',
      category: 'Cloud',
      proficiency: 72,
      recentActivity: 60,
      experience: '1+ year cloud infrastructure experience',
      icon: 'Cloud',
      color: 'from-yellow-600 to-orange-500',
      description: `Cloud computing enthusiast with hands-on experience in AWS services including EC2, S3, Lambda, and RDS. Currently expanding knowledge in serverless architectures.`,
      certifications: ['AWS Cloud Practitioner'],
      projects: ['Static Website Hosting', 'Serverless API', 'Database Migration'],
      resources: ['AWS Documentation', 'A Cloud Guru', 'AWS Well-Architected Framework'],
      satellites: [
        { name: 'EC2', proficiency: 75 },
        { name: 'S3', proficiency: 80 },
        { name: 'Lambda', proficiency: 65 }
      ]
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      category: 'Databases',
      proficiency: 82,
      recentActivity: 65,
      experience: '2+ years NoSQL database experience',
      icon: 'Database',
      color: 'from-green-600 to-teal-400',
      description: `NoSQL database specialist with expertise in MongoDB design patterns, aggregation pipelines, and performance optimization. Experienced in both standalone and replica set configurations.`,
      certifications: ['MongoDB Developer'],
      projects: ['User Management System', 'Content Management Platform', 'Analytics Dashboard'],
      resources: ['MongoDB University', 'MongoDB Manual', 'NoSQL Design Patterns'],
      satellites: [
        { name: 'Mongoose', proficiency: 85 },
        { name: 'Aggregation', proficiency: 80 },
        { name: 'Indexing', proficiency: 75 }
      ]
    },
    {
      id: 'tensorflow',
      name: 'TensorFlow',
      category: 'Emerging Tech',
      proficiency: 65,
      recentActivity: 85,
      experience: '1+ year machine learning exploration',
      icon: 'Brain',
      color: 'from-purple-500 to-pink-400',
      description: `Machine learning enthusiast exploring deep learning with TensorFlow. Currently working on computer vision and natural language processing projects.`,
      certifications: ['TensorFlow Developer Certificate (In Progress)'],
      projects: ['Image Classification Model', 'Sentiment Analysis Tool', 'Recommendation System'],
      resources: ['TensorFlow Documentation', 'Deep Learning Specialization', 'Hands-On ML'],
      satellites: [
        { name: 'Keras', proficiency: 70 },
        { name: 'Neural Networks', proficiency: 60 },
        { name: 'Computer Vision', proficiency: 65 }
      ]
    },
    {
      id: 'blockchain',
      name: 'Blockchain',
      category: 'Emerging Tech',
      proficiency: 55,
      recentActivity: 40,
      experience: '6 months exploring decentralized technologies',
      icon: 'Link',
      color: 'from-indigo-500 to-purple-400',
      description: `Blockchain technology explorer with basic understanding of smart contracts, cryptocurrency, and decentralized applications. Currently learning Solidity and Web3 development.`,
      certifications: ['Blockchain Basics'],
      projects: ['Simple Smart Contract', 'Cryptocurrency Tracker', 'NFT Marketplace Concept'],
      resources: ['Ethereum Documentation', 'Solidity by Example', 'Web3 University'],
      satellites: [
        { name: 'Solidity', proficiency: 50 },
        { name: 'Web3.js', proficiency: 45 },
        { name: 'Smart Contracts', proficiency: 55 }
      ]
    }
  ];

  // Mock progress data for skills
  const skillProgressData = {
    'javascript': [
      { date: '2021-01', value: 60, label: 'Started Learning' },
      { date: '2021-06', value: 75, label: 'First Project' },
      { date: '2022-01', value: 85, label: 'Advanced Concepts' },
      { date: '2022-06', value: 90, label: 'Framework Mastery' },
      { date: '2023-01', value: 95, label: 'Expert Level' }
    ],
    'react': [
      { date: '2021-03', value: 40, label: 'Introduction' },
      { date: '2021-08', value: 65, label: 'Component Mastery' },
      { date: '2022-02', value: 80, label: 'Hooks & Context' },
      { date: '2022-08', value: 90, label: 'Advanced Patterns' },
      { date: '2023-02', value: 92, label: 'Performance Optimization' }
    ],
    'python': [
      { date: '2020-09', value: 30, label: 'Basics' },
      { date: '2021-03', value: 55, label: 'Data Structures' },
      { date: '2021-09', value: 70, label: 'Web Development' },
      { date: '2022-03', value: 82, label: 'Data Science' },
      { date: '2022-09', value: 88, label: 'Machine Learning' }
    ]
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter skills based on search, category, and view
  const filteredSkills = allSkills?.filter(skill => {
    const matchesSearch = skill?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         skill?.category?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || skill?.category === selectedCategory;
    
    const matchesView = selectedView === 'all' || 
                       (selectedView === 'fullstack' && ['Programming Languages', 'Frameworks', 'Databases']?.includes(skill?.category)) ||
                       (selectedView === 'datascience' && ['Python', 'TensorFlow', 'MongoDB']?.includes(skill?.name)) ||
                       (selectedView === 'mobile' && ['JavaScript', 'React']?.includes(skill?.name)) ||
                       (selectedView === 'devops' && ['Tools', 'Cloud']?.includes(skill?.category));

    return matchesSearch && matchesCategory && matchesView;
  });

  const categories = [...new Set(allSkills.map(skill => skill.category))];

  const handleSkillSelect = (skill) => {
    setSelectedSkill(skill);
    if (isMobile) {
      setIsFilterPanelOpen(false);
    }
  };

  const handleCloseSidebar = () => {
    setSelectedSkill(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16 h-screen flex">
        {/* Filter Panel */}
        <motion.div
          className={`${
            isMobile 
              ? `fixed left-0 top-16 h-full w-80 bg-card border-r border-border shadow-elevation-3 z-30 transform ${
                  isFilterPanelOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-80 bg-card border-r border-border'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="p-6 h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gradient">Skills Observatory</h1>
                <p className="text-sm text-muted-foreground">Interactive skill visualization</p>
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

          {/* Universe Visualization */}
          <div className="h-full">
            <SkillUniverse
  skills={filteredSkills}
  selectedSkill={selectedSkill}
  onSkillSelect={handleSkillSelect}
  hoveredSkill={hoveredSkill}
  onSkillHover={setHoveredSkill}
  selectedView={selectedView}
/>
          </div>

          {/* Stats Overlay */}
          <div className="absolute top-4 right-4 glass-card p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">{filteredSkills?.length}</div>
              <div className="text-xs text-muted-foreground">Skills Visible</div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-lg font-semibold text-success">
                {Math.round(filteredSkills?.reduce((acc, skill) => acc + skill?.proficiency, 0) / filteredSkills?.length)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Proficiency</div>
            </div>
          </div>

          {/* Empty State */}
          {filteredSkills?.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Skills Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
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
            skillProgressData={skillProgressData}
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