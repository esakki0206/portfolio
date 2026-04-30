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
  const [expandedCards, setExpandedCards] = useState(new Set());

  // ── Real achievements — 100 % verified data ────────────────────────────
  const achievements = [
    {
      id: 1,
      title: 'Intra-College Hackathon — 1st Place',
      category: 'Competitions',
      organization: "St. Joseph's College (Autonomous)",
      date: '2024',
      description:
        'Won 1st place at the intra-college hackathon building a "Budget-Friendly CCTV" prototype using ESP32-CAM and Arduino IDE. Earned a ₹2,000 cash prize.',
      skills: ['Arduino IDE', 'ESP32-CAM', 'C++', 'IoT', 'Wi-Fi Streaming', 'Rapid Prototyping'],
      detailedDescription: `Worked in a team of four first-year students to design and build a low-cost surveillance prototype.

Project highlights:
• Programmed the ESP32-CAM module in C++ using the Arduino IDE
• Implemented an MJPEG HTTP server for live browser-based video feed
• Achieved a fully functional prototype under ₹500 in total component cost
• Demonstrated how open-source hardware can democratise security technology
• Won 1st place and ₹2,000 cash prize against multiple competing teams`,
      impact: [
        { value: '🥇', label: '1st Place' },
        { value: '₹2,000', label: 'Cash Prize' },
        { value: '< ₹500', label: 'Prototype Cost' },
      ],
    },
    {
      id: 15,
      title: 'PITCHFEST Hackathon — Electro Plant X',
      category: 'Competitions',
      organization: "St. Joseph's College (Autonomous)",
      date: '2024',
      description:
        'Built "Electro Plant X" at the PITCHFEST hackathon conducted in our college — an innovative IoT-based prototype combining embedded systems with real-world problem solving.',
      skills: ['IoT', 'Embedded Systems', 'Prototyping', 'Teamwork', 'Presentation', 'Innovation'],
      image: '/assets/images/ElectroPlant-X.jpeg',
      detailedDescription: `Participated in PITCHFEST, an intra-college hackathon focused on innovative product ideas and live pitching.

Project — Electro Plant X:
• Designed and built an IoT-based prototype addressing real-world needs
• Combined hardware prototyping with software integration
• Delivered a live pitch to a panel of judges explaining the concept, prototype, and market potential
• Gained valuable experience in rapid ideation, prototyping under time pressure, and public speaking
• Strengthened teamwork and cross-functional collaboration skills`,
      impact: [
        { value: 'IoT', label: 'Domain' },
        { value: 'PITCHFEST', label: 'Event' },
        { value: 'Prototype', label: 'Delivered' },
      ],
    },
    {
      id: 16,
      title: 'Financial Tech Hackathon — Participation',
      category: 'Competitions',
      organization: 'FinTech Hackathon',
      date: '2024',
      description:
        'Participated in a Financial Technology hackathon, working on fintech solutions and gaining exposure to the intersection of finance and technology.',
      skills: ['FinTech', 'Problem Solving', 'Teamwork', 'Rapid Prototyping', 'Presentation'],
      certificateUrl: '/assets/FinTech.pdf',
      detailedDescription: `Competed in a Financial Technology hackathon, exploring technology-driven solutions for the finance sector.

Highlights:
• Worked on building a technology solution for a fintech problem statement
• Gained exposure to financial systems, payment processing concepts, and regulatory considerations
• Collaborated with team members under strict time constraints
• Received a certificate of participation for completing the hackathon`,
      impact: [
        { value: 'FinTech', label: 'Domain' },
        { value: 'Hackathon', label: 'Event Type' },
        { value: 'Certificate', label: 'Received' },
      ],
    },
    {
      id: 2,
      title: '1st Prize — Technical Quiz, NACOTECH-2025',
      category: 'Competitions',
      organization: 'NACOTECH-2025 (Inter-College Event)',
      date: '2025',
      description:
        'Secured 1st prize in the Technical Quiz at NACOTECH-2025, an inter-college technical symposium. Demonstrated strong knowledge across CS fundamentals, algorithms, and current technologies.',
      skills: ['Computer Science', 'Algorithms', 'Problem Solving', 'Quick Recall', 'Teamwork'],
      detailedDescription: `Competed against participants from multiple colleges in a timed technical quiz covering a broad range of Computer Science topics.

Highlights:
• Covered topics: data structures, algorithms, networking, DBMS, OS, and current tech trends
• Multi-round format with elimination rounds testing depth and speed
• Won 1st prize, demonstrating consistent accuracy and fast recall under pressure
• Represented St. Joseph's College at an inter-college level`,
      impact: [
        { value: '🥇', label: '1st Prize' },
        { value: 'Inter-College', label: 'Level' },
        { value: 'CS Fundamentals', label: 'Domain' },
      ],
    },
    {
      id: 3,
      title: '2nd Prize — Python Debugging, SRM Symposium',
      category: 'Competitions',
      organization: 'SRM Technical Symposium',
      date: '2025',
      description:
        'Secured 2nd prize in the Python Debugging competition at SRM Technical Symposium. Identified and fixed complex bugs in Python code under strict time constraints.',
      skills: ['Python', 'Debugging', 'Problem Solving', 'Code Analysis', 'Time Management'],
      detailedDescription: `Participated in a competitive Python debugging challenge at SRM's annual technical symposium.

Highlights:
• Given buggy Python scripts with logical errors, syntax issues, and edge-case failures
• Required to identify root causes and apply correct fixes within strict time limits
• Demonstrated strong understanding of Python internals, scoping, and common pitfalls
• Secured 2nd prize against a competitive field of participants from multiple institutions`,
      impact: [
        { value: '🥈', label: '2nd Prize' },
        { value: 'Python', label: 'Language' },
        { value: 'SRM', label: 'Institution' },
      ],
    },
    {
      id: 4,
      title: '1st Rank Holder — Semesters 1 to 5',
      category: 'Academic Excellence',
      organization: "St. Joseph's College (Autonomous)",
      date: '2023 – Present',
      description:
        'Consistently secured 1st rank across all five semesters of B.Sc. Computer Science with an 8.5 GPA. Earned ₹1,000 in rank prizes and academic merit certificates.',
      skills: ['Data Structures', 'Algorithms', 'Database Systems', 'Machine Learning', 'Computer Networks', 'Numerical Methods'],
      detailedDescription: `Maintained the highest academic standing throughout my university career at St. Joseph's College (Autonomous).

Achievements:
• 1st Rank in Semester 1 through Semester 5 — consistent topper
• Cumulative GPA: 8.5
• Earned ₹1,000 total in rank prizes + merit certificates each semester
• Key coursework: Data Structures, Algorithms, DBMS, Machine Learning, Computer Networks, Python Programming
• Balanced academic excellence with internship work, hackathons, and personal projects`,
      impact: [
        { value: '1st', label: 'Rank (All 5 Sem)' },
        { value: '8.5', label: 'GPA' },
        { value: '₹1,000', label: 'Rank Prizes' },
      ],
    },
    {
      id: 5,
      title: 'Full-Stack Internship — FrontierWox Tech Private Limited',
      category: 'Experience',
      organization: 'FrontierWox Tech Private Limited',
      date: '2024',
      description:
        'Completed a full-stack development internship, building a production Resume Builder web app using React, PHP, and MySQL. The application is live at resumebuilder.frontierwox.in.',
      skills: ['React', 'PHP', 'MySQL', 'REST API', 'Responsive Design', 'Full-Stack'],
      detailedDescription: `Internship at FrontierWoc Tech Private Limited (a startup focused on business automation tools). Worked as a junior full-stack developer.

Key responsibilities:
• Designed and built a responsive React frontend with live resume preview
• Implemented PHP REST API endpoints for CRUD operations on user resumes
• Designed the MySQL database schema for storing dynamic resume data
• Participated in daily code reviews with senior developers
• Deployed and maintained the application on the company server

Outcome: The Resume Builder is live at resumebuilder.frontierwox.in and used by real users.`,
      liveUrl: 'https://resumebuilder.frontierwox.in/',
      impact: [
        { value: 'Live', label: 'Production App' },
        { value: 'React', label: 'Frontend' },
        { value: 'PHP/MySQL', label: 'Backend' },
      ],
    },
    {
      id: 6,
      title: 'Python for Data Science — NPTEL Certification',
      category: 'Certifications',
      organization: 'NPTEL (IIT)',
      date: '2024',
      description:
        'Completed the "Python for Data Science" certification from NPTEL, strengthening skills in Python for data analysis, visualisation, and scientific computing.',
      skills: ['Python', 'Data Science', 'NumPy', 'Pandas', 'Data Analysis'],
      certificateUrl: '/assets/Python for Data Science.pdf',
      detailedDescription: `Earned a certified credential from NPTEL (National Programme on Technology Enhanced Learning), run by IITs.

Course covered:
• Python fundamentals for scientific computing
• NumPy arrays and vectorised operations
• Pandas DataFrames for data wrangling
• Data visualisation with Matplotlib
• Practical exercises and proctored exam`,
      impact: [
        { value: 'NPTEL', label: 'Platform' },
        { value: 'Python', label: 'Language' },
        { value: 'Certified', label: 'Status' },
      ],
    },
    {
      id: 7,
      title: 'Programming in Java — NPTEL Certification',
      category: 'Certifications',
      organization: 'NPTEL (IIT)',
      date: '2024',
      description:
        'Completed the "Programming in Java" certification from NPTEL, covering OOP principles, collections, multithreading, and application development.',
      skills: ['Java', 'OOP', 'Collections', 'Multithreading', 'Exception Handling'],
      detailedDescription: `Earned a certified credential from NPTEL covering Java programming in depth.

Course covered:
• Object-oriented programming: classes, inheritance, polymorphism, abstraction
• Java Collections Framework: Lists, Maps, Sets
• Exception handling and file I/O
• Multithreading and concurrency basics
• Practical assignments and proctored exam`,
      impact: [
        { value: 'NPTEL', label: 'Platform' },
        { value: 'Java', label: 'Language' },
        { value: 'Certified', label: 'Status' },
      ],
    },
    {
      id: 8,
      title: 'Data Science for Engineers — NPTEL Certification',
      category: 'Certifications',
      organization: 'NPTEL (IIT)',
      date: '2024',
      description:
        'Completed "Data Science for Engineers" from NPTEL, covering statistics, probability, regression, classification, and machine learning fundamentals.',
      skills: ['Data Science', 'Statistics', 'Probability', 'Regression', 'Classification', 'Python'],
      certificateUrl: '/assets/Data science Certification.pdf',
      detailedDescription: `Earned a certified credential from NPTEL focused on data science fundamentals for engineering students.

Course covered:
• Probability and statistics fundamentals
• Linear regression and logistic regression
• Classification algorithms and model evaluation
• Dimensionality reduction techniques
• Hands-on exercises with real datasets`,
      impact: [
        { value: 'NPTEL', label: 'Platform' },
        { value: 'Data Science', label: 'Domain' },
        { value: 'Certified', label: 'Status' },
      ],
    },
    {
      id: 9,
      title: 'Project Management: Running the Project — Coursera',
      category: 'Certifications',
      organization: 'Coursera',
      date: '2024',
      description:
        'Completed "Project Management: Running the Project" on Coursera, learning structured project delivery, risk management, and stakeholder communication.',
      skills: ['Project Management', 'Risk Management', 'Agile', 'Stakeholder Communication', 'Planning'],
      certificateUrl: '/assets/project mgmt new.pdf',
      detailedDescription: `Earned a certified credential from Coursera focused on project execution and delivery.

Course covered:
• Project planning and scheduling
• Risk identification and mitigation strategies
• Stakeholder management and communication
• Monitoring project progress and quality
• Agile and traditional project management approaches`,
      impact: [
        { value: 'Coursera', label: 'Platform' },
        { value: 'PM', label: 'Domain' },
        { value: 'Certified', label: 'Status' },
      ],
    },
    {
      id: 17,
      title: 'Data Analysis using Python — Certification',
      category: 'Certifications',
      organization: 'Online Certification',
      date: '2024',
      description:
        'Completed "Data Analysis using Python" certification, covering data wrangling with Pandas, exploratory data analysis, and data-driven decision making.',
      skills: ['Python', 'Pandas', 'Data Analysis', 'Data Wrangling', 'Visualisation'],
      certificateUrl: '/assets/Data analyze using py.pdf',
      detailedDescription: `Earned a certified credential focused on practical data analysis workflows using Python.

Course covered:
• Data loading, cleaning, and preprocessing with Pandas
• Exploratory data analysis (EDA) techniques
• Statistical summaries and aggregation
• Data visualisation for insights and reporting
• Real-world datasets and hands-on exercises`,
      impact: [
        { value: 'Python', label: 'Language' },
        { value: 'Data Analysis', label: 'Domain' },
        { value: 'Certified', label: 'Status' },
      ],
    },
    {
      id: 10,
      title: 'Holo Find X — Final Year Project',
      category: 'Projects',
      organization: "St. Joseph's College",
      date: '2024',
      description:
        'Developed Holo Find X, an Augmented Reality (AR) object tracking and finding application for indoor areas using Kotlin and React Native.',
      skills: ['Kotlin', 'React Native', 'Android', 'Augmented Reality', 'Mobile Development'],
      detailedDescription: `Developed an innovative Augmented Reality mobile application for indoor object tracking as my final year academic project.

Highlights:
• Utilised Kotlin and React Native to build a robust, cross-platform capable Android application
• Implemented AR features to map indoor spaces and track specific objects in real-time
• Solved the real-world problem of finding misplaced items indoors
• Successfully presented and defended as the culminating project of my degree`,
      impact: [
        { value: 'AR', label: 'Technology' },
        { value: 'Final Year', label: 'Project' },
        { value: 'Android', label: 'Platform' },
      ],
    },
    {
      id: 11,
      title: 'High School Academic Excellence — 80%',
      category: 'Academic Excellence',
      organization: 'High School',
      date: '2023',
      description:
        'Graduated high school with 80% aggregate, top 10% of the class. Scored 92% in Computer Science, building early foundations in programming and algorithms.',
      skills: ['Mathematics', 'Physics', 'Computer Science', 'STEM', 'Problem Solving'],
      detailedDescription: `Completed secondary and higher secondary education with a strong STEM focus.

Highlights:
• 80% aggregate — top 10% of graduating class
• Computer Science elective: 92% — first introduction to programming
• Mathematics: 88% — strong foundation in algebra and calculus
• Started self-teaching Python during this period
• Foundation that enabled smooth transition into a CS degree`,
      impact: [
        { value: '80%', label: 'Aggregate' },
        { value: 'Top 10%', label: 'Class Rank' },
        { value: '92%', label: 'CS Score' },
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
              : name === 'Certifications'
                ? 'Award'
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

    // Sort by date by default (descending)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    return filtered;
  }, [achievements, selectedCategory]);

  const toggleCardExpansion = (id) => {
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Achievements — Esakkiappan Portfolio</title>
        <meta
          name="description"
          content="Real milestones: hackathon wins, competition prizes, NPTEL & Coursera certifications, production internship, and consistent academic excellence."
        />
      </Helmet>
      <Header />

      <main className="pt-16">
        {/* Hero */}
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
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Trophy" size={28} className="text-white" />
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Award" size={28} className="text-white" />
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Icon name="Star" size={28} className="text-white" />
                </div>
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

        {/* Achievements Grid */}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or filters.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory('all');
                  }}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
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
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                These milestones reflect my commitment to learning through doing. Let's discuss how
                I can contribute to your next project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() =>
                    window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')
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
                  window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')
                }
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Icon name="Linkedin" size={20} />
              </button>
              <button
                onClick={() => window.open('mailto:esakki0720@gmail.com', '_self')}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="Email"
              >
                <Icon name="Mail" size={20} />
              </button>
              <button
                onClick={() => window.open('https://github.com/Esakkiappan10', '_blank')}
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
                aria-label="GitHub"
              >
                <Icon name="Github" size={20} />
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
