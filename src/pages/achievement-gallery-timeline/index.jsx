import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AchievementCard from './components/AchievementCard';
import FilterBar from './components/FilterBar';
import VerificationHub from './components/VerificationHub';
import StatsOverview from './components/StatsOverview';

const AchievementGalleryTimeline = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "Dean\'s List Recognition",
      category: "Academic Excellence",
      organization: "University of Technology",
      date: "Spring 2024",
      description: "Achieved Dean's List recognition for maintaining a GPA above 3.8 while taking advanced Computer Science coursework including Data Structures, Algorithms, and Software Engineering.",
      gpa: 3.92,
      skills: ["Academic Excellence", "Time Management", "Critical Thinking"],
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop",
      detailedDescription: `Maintained exceptional academic performance throughout the semester while balancing a challenging course load of 18 credit hours.\n\nKey achievements:\n• Advanced Data Structures and Algorithms (A+)\n• Software Engineering Principles (A)\n• Database Management Systems (A)\n• Computer Networks (A-)\n\nThis recognition reflects consistent dedication to academic excellence and deep understanding of core Computer Science concepts.`,
      validUntil: "2025-05-15"
    },
    {
      id: 2,
      title: "AWS Cloud Practitioner Certification",
      category: "Certifications",
      organization: "Amazon Web Services",
      date: "March 2024",
      description: "Successfully completed AWS Cloud Practitioner certification, demonstrating foundational knowledge of AWS cloud services, security, and pricing models.",
      skills: ["AWS", "Cloud Computing", "Infrastructure", "Security"],
      verificationUrl: "https://aws.amazon.com/verification/",
      credentialId: "AWS-CCP-2024-789456",
      validUntil: "2027-03-15",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?w=800&h=400&fit=crop",
      detailedDescription: `Comprehensive certification covering AWS cloud fundamentals including:\n\n• AWS Global Infrastructure and Services\n• Security and Compliance in the Cloud\n• Billing and Pricing Models\n• Support Plans and Resources\n\nScored 892/1000 on the certification exam, demonstrating strong understanding of cloud computing principles and AWS service offerings.`
    },
    {
      id: 3,
      title: "HackTech 2024 - 2nd Place",
      category: "Competitions",
      organization: "TechHub Innovation Center",
      date: "February 2024",
      description: "Secured 2nd place in a 48-hour hackathon with \'EcoTrack\' - a mobile app for carbon footprint tracking using machine learning algorithms.",
      participants: 156,
      ranking: 2,
      skills: ["React Native", "Machine Learning", "Python", "Team Leadership", "UI/UX Design"],
      teamMembers: ["Sarah Johnson", "Mike Chen", "Alex Rodriguez"],
      feedback: "Exceptional implementation of ML algorithms for real-time carbon tracking. The team showed great collaboration and technical depth.",
      githubUrl: "https://github.com/johndoe/ecotrack",
      liveUrl: "https://ecotrack-demo.vercel.app",
      image: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=800&h=400&fit=crop",
      detailedDescription: `EcoTrack is an innovative mobile application that helps users monitor and reduce their carbon footprint through intelligent tracking and personalized recommendations.\n\nKey Features:\n• Real-time carbon footprint calculation\n• Machine learning-based activity recognition\n• Personalized eco-friendly suggestions\n• Social challenges and leaderboards\n• Integration with IoT devices\n\nTechnical Implementation:\n• React Native for cross-platform mobile development\n• Python backend with Flask framework\n• TensorFlow for ML model training\n• PostgreSQL database for user data\n• AWS deployment with auto-scaling`,
      impact: [
        { value: "10K+", label: "Potential Users" },
        { value: "25%", label: "Carbon Reduction" },
        { value: "4.8/5", label: "User Rating" }
      ]
    },
    {
      id: 4,
      title: "Google Cloud Associate Certification",
      category: "Certifications",
      organization: "Google Cloud Platform",
      date: "January 2024",
      description: "Earned Google Cloud Associate Cloud Engineer certification, validating skills in deploying applications, monitoring operations, and managing enterprise solutions.",
      skills: ["Google Cloud", "Kubernetes", "DevOps", "Monitoring", "Networking"],
      verificationUrl: "https://cloud.google.com/certification/verify/",
      credentialId: "GCP-ACE-2024-123789",
      validUntil: "2027-01-20",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
      detailedDescription: `Comprehensive certification demonstrating proficiency in:\n\n• Setting up cloud solutions environment\n• Planning and configuring cloud solutions\n• Deploying and implementing cloud solutions\n• Ensuring successful operation of cloud solutions\n• Configuring access and security\n\nPractical experience with GCP services including Compute Engine, App Engine, Kubernetes Engine, and Cloud Storage.`
    },
    {
      id: 5,
      title: "Outstanding Student Leadership Award",
      category: "Recognition",
      organization: "Computer Science Department",
      date: "December 2023",
      description: "Recognized for exceptional leadership in organizing coding workshops, mentoring junior students, and contributing to department initiatives.",
      skills: ["Leadership", "Mentoring", "Public Speaking", "Event Organization"],
      image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?w=800&h=400&fit=crop",
      detailedDescription: `Leadership recognition based on significant contributions to the Computer Science community:\n\n• Organized 12 coding workshops for 200+ students\n• Mentored 15 junior students in programming fundamentals\n• Led the CS Student Association as Vice President\n• Coordinated industry guest speaker series\n• Established peer tutoring program\n\nThis award reflects commitment to fostering a collaborative learning environment and supporting fellow students' academic growth.`,
      impact: [
        { value: "200+", label: "Students Helped" },
        { value: "12", label: "Workshops Organized" },
        { value: "15", label: "Students Mentored" }
      ]
    },
    {
      id: 6,
      title: "CodeForces Expert Rating",
      category: "Competitions",
      organization: "CodeForces",
      date: "November 2023",
      description: "Achieved Expert rating (1600+) on CodeForces competitive programming platform through consistent performance in algorithmic contests.",
      participants: 50000,
      ranking: 1247,
      difficulty: "Expert",
      skills: ["Algorithms", "Data Structures", "Problem Solving", "C++", "Mathematics"],
      verificationUrl: "https://codeforces.com/profile/johndoe",
      image: "https://images.pixabay.com/photo/2015/09/17/17/25/code-944499_1280.jpg?w=800&h=400&fit=crop",
      detailedDescription: `Competitive programming achievement demonstrating strong algorithmic thinking and problem-solving skills.\n\nKey Accomplishments:\n• Solved 500+ algorithmic problems\n• Participated in 50+ rated contests\n• Maintained consistent performance over 6 months\n• Specialized in dynamic programming and graph algorithms\n\nThis rating places me in the top 5% of active competitive programmers globally, showcasing ability to solve complex algorithmic challenges under time pressure.`
    },
    {
      id: 7,
      title: "React Developer Certification",
      category: "Certifications",
      organization: "Meta (Facebook)",
      date: "October 2023",
      description: "Completed Meta's Professional React Developer certification, mastering modern React development patterns, hooks, and state management.",
      skills: ["React", "JavaScript", "Redux", "Testing", "Performance Optimization"],
      verificationUrl: "https://coursera.org/verify/professional-cert/",credentialId: "META-REACT-2023-456123",validUntil: "2026-10-15",image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
      detailedDescription: `Comprehensive certification program covering advanced React development:\n\n• Modern React patterns and best practices\n• Advanced hooks and custom hook development\n• State management with Redux and Context API\n• Testing strategies with Jest and React Testing Library\n• Performance optimization techniques\n• Accessibility and responsive design principles\n\nCompleted 8 hands-on projects demonstrating practical application of React concepts in real-world scenarios.`
    },
    {
      id: 8,
      title: "Innovation Challenge Winner",category: "Competitions",organization: "University Tech Expo",date: "September 2023",description: "Won first place in the University Innovation Challenge with \'StudyBuddy\' - an AI-powered study companion app using natural language processing.",
      participants: 89,
      ranking: 1,
      difficulty: "Advanced",
      skills: ["Artificial Intelligence", "NLP", "Python", "Flask", "Machine Learning"],
      teamMembers: ["Emma Wilson", "David Park"],
      feedback: "Innovative use of AI technology with practical application for students. Excellent technical execution and user experience design.",githubUrl: "https://github.com/johndoe/studybuddy",liveUrl: "https://studybuddy-ai.herokuapp.com",
      documentUrl: "https://docs.studybuddy.com",image: "https://images.pexels.com/photos/3861943/pexels-photo-3861943.jpeg?w=800&h=400&fit=crop",
      detailedDescription: `StudyBuddy is an AI-powered study companion that helps students optimize their learning through personalized recommendations and intelligent content analysis.\n\nCore Features:\n• Natural language processing for content summarization\n• Personalized study schedule generation\n• Interactive Q&A with AI tutor\n• Progress tracking and analytics\n• Collaborative study group features\n\nTechnical Architecture:\n• Python backend with Flask framework\n• OpenAI GPT integration for NLP capabilities\n• React frontend with responsive design\n• MongoDB for user data and study materials\n• Docker containerization for deployment`,
      impact: [
        { value: "500+", label: "Beta Users" },
        { value: "40%", label: "Study Efficiency" },
        { value: "4.9/5", label: "User Satisfaction" }
      ]
    }
  ];

  // Calculate categories with counts
  const categories = useMemo(() => {
    const categoryMap = {};
    achievements?.forEach(achievement => {
      categoryMap[achievement.category] = (categoryMap?.[achievement?.category] || 0) + 1;
    });
    
    return Object.entries(categoryMap)?.map(([name, count]) => ({
      name,
      count,
      icon: name === 'Academic Excellence' ? 'GraduationCap' :
            name === 'Certifications' ? 'Award' :
            name === 'Competitions' ? 'Trophy' :
            name === 'Recognition' ? 'Star' : 'Medal'
    }));
  }, [achievements]);

  // Filter and sort achievements
  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(achievement => achievement?.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm?.toLowerCase();
      filtered = filtered?.filter(achievement =>
        achievement?.title?.toLowerCase()?.includes(searchLower) ||
        achievement?.description?.toLowerCase()?.includes(searchLower) ||
        achievement?.organization?.toLowerCase()?.includes(searchLower) ||
        (achievement?.skills && achievement?.skills?.some(skill => 
          skill?.toLowerCase()?.includes(searchLower)
        ))
      );
    }

    // Sort achievements
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date) - new Date(a.date);
        case 'category':
          return a?.category?.localeCompare(b?.category);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [achievements, selectedCategory, searchTerm, sortBy]);

  const toggleCardExpansion = (achievementId) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(achievementId)) {
        newSet?.delete(achievementId);
      } else {
        newSet?.add(achievementId);
      }
      return newSet;
    });
  };

  // Scroll to top when filters change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Achievement Gallery Timeline - Esakkiappan Portfolio</title>
        <meta name="description" content="Explore my academic achievements, certifications, and competitive accomplishments through an interactive timeline showcase." />
        <meta name="keywords" content="achievements, certifications, competitions, academic excellence, awards, recognition" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-6 lg:px-8 overflow-hidden">
          {/* Background Effects */}
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
                  <Icon name="Award" size={32} className="text-white" />
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Star" size={32} className="text-white" />
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-gradient">Achievement</span>
                <br />
                <span className="text-foreground">Gallery Timeline</span>
              </h1>

              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                A comprehensive showcase of academic excellence, professional certifications, 
                competitive achievements, and recognition earned throughout my Computer Science journey. 
                Each milestone represents dedication, growth, and technical mastery.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => document.getElementById('achievements-section')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="ArrowDown"
                  iconPosition="right"
                  className="magnetic-button neon-glow-hover"
                >
                  Explore Achievements
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => document.getElementById('verification-hub')?.scrollIntoView({ behavior: 'smooth' })}
                  iconName="Shield"
                  iconPosition="left"
                  className="magnetic-button"
                >
                  Verification Hub
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <StatsOverview achievements={achievements} />
          </div>
        </section>

        {/* Verification Hub */}
        <section id="verification-hub" className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <VerificationHub achievements={achievements} />
          </div>
        </section>

        {/* Achievements Timeline */}
        <section id="achievements-section" className="py-12 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Filter Bar */}
            <FilterBar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortBy={sortBy}
              onSortChange={setSortBy}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              totalCount={achievements?.length}
              filteredCount={filteredAchievements?.length}
            />

            {/* Achievement Cards */}
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-success to-accent/20 hidden lg:block"></div>

              {filteredAchievements?.length > 0 ? (
                <div className="space-y-0">
                  {filteredAchievements?.map((achievement, index) => (
                    <AchievementCard
                      key={achievement?.id}
                      achievement={achievement}
                      index={index}
                      isExpanded={expandedCards?.has(achievement?.id)}
                      onToggle={() => toggleCardExpansion(achievement?.id)}
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
                  <h3 className="text-xl font-semibold text-foreground mb-2">No achievements found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search terms or filters to find what you're looking for.
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

        {/* Call to Action */}
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
                These achievements represent my commitment to excellence and continuous learning. 
                Let's discuss how my skills and experience can contribute to your next project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => window.location.href = '/about-universe-journey'}
                  iconName="MessageCircle"
                  iconPosition="left"
                  className="magnetic-button neon-glow-hover"
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.location.href = '/project-laboratory-showcase'}
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
             <span className="inline-block w-4 h-4 text-background text-[16px] font-medium text-center">
  EA
</span>
              </div>
              <span className="text-foreground font-semibold">Esakkiappan Portfolio</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button
                onClick={() => window.open('https://github.com', '_blank')}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <Icon name="Github" size={20} />
              </button>
              <button
                onClick={() => window.open('https://linkedin.com', '_blank')}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <Icon name="Linkedin" size={20} />
              </button>
              <button
                onClick={() => window.open('mailto:contact@codesphere.dev', '_self')}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                <Icon name="Mail" size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground text-sm">
              {new Date()?.getFullYear()} Esakkiappan Portfolio. Crafted with passion for innovation and excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AchievementGalleryTimeline;