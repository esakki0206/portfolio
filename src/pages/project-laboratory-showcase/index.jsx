import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterSystem from './components/FilterSystem';
import ProjectStats from './components/ProjectStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProjectLaboratoryShowcase = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [selectedComplexity, setSelectedComplexity] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management, secure payment processing, and advanced analytics dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      category: "Full Stack Development",
      techStack: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      complexity: "Advanced",
      status: "Live",
      collaborationStatus: "Open",
      metrics: {
        linesOfCode: "15.2K",
        githubStars: "47"
      },
      githubUrl: "https://github.com/username/ecommerce-platform",
      demoUrl: "https://ecommerce-demo.vercel.app",
      problemStatement: "Small businesses needed an affordable, feature-rich e-commerce solution that could compete with enterprise platforms while remaining easy to manage.",
      solution: "Built a modular, scalable platform with microservices architecture, real-time features, and comprehensive admin dashboard.",
      features: [
        "Real-time inventory tracking",
        "Secure payment processing with Stripe",
        "Advanced analytics and reporting",
        "Mobile-responsive design",
        "Multi-vendor support",
        "SEO optimization"
      ],
      lessonsLearned: [
        "Implementing real-time features requires careful consideration of server resources",
        "Payment security is paramount and requires thorough testing",
        "User experience design significantly impacts conversion rates"
      ],
      codeSnippets: [
        {
          id: "payment-processing",
          title: "Payment Processing Logic",
          code: `const processPayment = async (paymentData) => {\n  try {\n    const paymentIntent = await stripe.paymentIntents.create({\n      amount: paymentData.amount,\n      currency: 'usd',\n      metadata: { orderId: paymentData.orderId }\n    });\n    return { success: true, clientSecret: paymentIntent.client_secret };\n  } catch (error) {\n    console.error('Payment processing failed:', error);\n    return { success: false, error: error.message };\n  }\n};`
        },
        {
          id: "inventory-update",
          title: "Real-time Inventory Updates",
          code: `const updateInventory = (productId, quantity) => {\n  io.emit('inventory-update', {\n    productId,\n    newQuantity: quantity,\n    timestamp: new Date().toISOString()\n  });\n};`
        }
      ]
    },
    {
      id: 2,
      title: "AI-Powered Task Manager",
      description: "Smart task management application using machine learning to predict task completion times and optimize scheduling.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=500&h=300&fit=crop",
      category: "Machine Learning",
      techStack: ["Python", "React", "TensorFlow", "FastAPI", "PostgreSQL"],
      complexity: "Advanced",
      status: "Development",
      collaborationStatus: "Closed",
      metrics: {
        linesOfCode: "12.8K",
        githubStars: "23"
      },
      githubUrl: "https://github.com/username/ai-task-manager",
      demoUrl: "https://ai-tasks-demo.vercel.app",
      problemStatement: "Traditional task managers don't learn from user behavior or provide intelligent scheduling suggestions.",
      solution: "Developed an AI system that analyzes task patterns, predicts completion times, and suggests optimal scheduling.",
      features: [
        "ML-powered time estimation",
        "Intelligent task prioritization",
        "Natural language task creation",
        "Productivity analytics",
        "Smart notifications",
        "Team collaboration features"
      ],
      lessonsLearned: [
        "Training ML models requires substantial historical data",
        "User feedback loops are crucial for model improvement",
        "Balancing automation with user control is challenging"
      ],
      codeSnippets: [
        {
          id: "task-prediction",
          title: "Task Completion Prediction",
          code: `import tensorflow as tf\nfrom sklearn.preprocessing import StandardScaler\n\nclass TaskPredictor:\n    def __init__(self):\n        self.model = tf.keras.Sequential([\n            tf.keras.layers.Dense(64, activation='relu'),\n            tf.keras.layers.Dropout(0.2),\n            tf.keras.layers.Dense(32, activation='relu'),\n            tf.keras.layers.Dense(1, activation='linear')\n        ])\n    \n    def predict_completion_time(self, task_features):\n        scaled_features = self.scaler.transform([task_features])\n        prediction = self.model.predict(scaled_features)\n        return prediction[0][0]`
        }
      ]
    },
    {
      id: 3,
      title: "Real-time Chat Application",
      description: "Modern chat application with end-to-end encryption, file sharing, and video calling capabilities.",
      image: "https://plus.unsplash.com/premium_photo-1720551256983-445d23d516b2?fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8&ixlib=rb-4.1.0&q=60&w=3000",
      category: "Real-time Communication",
      techStack: ["React", "Socket.io", "Node.js", "WebRTC", "Redis"],
      complexity: "Intermediate",
      status: "Live",
      collaborationStatus: "Open",
      metrics: {
        linesOfCode: "8.5K",
        githubStars: "31"
      },
      githubUrl: "https://github.com/username/realtime-chat",
      demoUrl: "https://chat-app-demo.vercel.app",
      problemStatement: "Need for secure, feature-rich communication platform for remote teams.",
      solution: "Built scalable chat system with modern web technologies and security best practices.",
      features: [
        "End-to-end encryption",
        "Real-time messaging",
        "File sharing",
        "Video/audio calls",
        "Group chats",
        "Message history"
      ],
      lessonsLearned: [
        "WebRTC implementation requires careful handling of network conditions",
        "Encryption adds complexity but is essential for security",
        "Real-time features need robust error handling"
      ],
      codeSnippets: [
        {
          id: "socket-connection",
          title: "Socket Connection Management",
          code: `const io = require('socket.io')(server, {\n  cors: {\n    origin: process.env.CLIENT_URL,\n    methods: ['GET', 'POST']\n  }\n});\n\nio.on('connection', (socket) => {\n  console.log('User connected:', socket.id);\n  \n  socket.on('join-room', (roomId) => {\n    socket.join(roomId);\n    socket.to(roomId).emit('user-joined', socket.id);\n  });\n  \n  socket.on('send-message', (data) => {\n    socket.to(data.roomId).emit('receive-message', data);\n  });\n});`
        }
      ]
    },
    {
      id: 4,
      title: "Weather Analytics Dashboard",
      description: "Interactive dashboard for weather data visualization with predictive analytics and historical trend analysis.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=500&h=300&fit=crop",
      category: "Data Visualization",
      techStack: ["React", "D3.js", "Python", "Flask", "OpenWeather API"],
      complexity: "Intermediate",
      status: "Live",
      collaborationStatus: "Open",
      metrics: {
        linesOfCode: "6.2K",
        githubStars: "18"
      },
      githubUrl: "https://github.com/username/weather-dashboard",
      demoUrl: "https://weather-analytics.vercel.app",
      problemStatement: "Weather data is often presented in basic formats that don't reveal meaningful patterns or trends.",
      solution: "Created interactive visualizations that make weather data insights accessible and actionable.",
      features: [
        "Interactive charts and graphs",
        "Historical trend analysis",
        "Weather predictions",
        "Location-based data",
        "Export functionality",
        "Mobile responsive design"
      ],
      lessonsLearned: [
        "D3.js has a steep learning curve but offers powerful visualization capabilities",
        "API rate limiting requires careful request management",
        "User interface design is crucial for data comprehension"
      ],
      codeSnippets: [
        {
          id: "data-visualization",
          title: "D3.js Weather Chart",
          code: `const createWeatherChart = (data) => {\n  const svg = d3.select('#weather-chart')\n    .append('svg')\n    .attr('width', width + margin.left + margin.right)\n    .attr('height', height + margin.top + margin.bottom);\n  \n  const xScale = d3.scaleTime()\n    .domain(d3.extent(data, d => new Date(d.date)))\n    .range([0, width]);\n  \n  const yScale = d3.scaleLinear()\n    .domain(d3.extent(data, d => d.temperature))\n    .range([height, 0]);\n  \n  const line = d3.line()\n    .x(d => xScale(new Date(d.date)))\n    .y(d => yScale(d.temperature))\n    .curve(d3.curveMonotoneX);\n  \n  svg.append('path')\n    .datum(data)\n    .attr('fill', 'none')\n    .attr('stroke', '#00F5FF')\n    .attr('stroke-width', 2)\n    .attr('d', line);\n};`
        }
      ]
    },
    {
      id: 5,
      title: "Blockchain Voting System",
      description: "Secure, transparent voting system built on blockchain technology with smart contracts and voter verification.",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?w=500&h=300&fit=crop",
      category: "Blockchain",
      techStack: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS"],
      complexity: "Advanced",
      status: "Development",
      collaborationStatus: "Closed",
      metrics: {
        linesOfCode: "9.1K",
        githubStars: "42"
      },
      githubUrl: "https://github.com/username/blockchain-voting",
      demoUrl: null,
      problemStatement: "Traditional voting systems lack transparency and are vulnerable to manipulation.",
      solution: "Implemented blockchain-based voting with immutable records and cryptographic security.",
      features: [
        "Smart contract voting logic",
        "Voter identity verification",
        "Immutable vote records",
        "Real-time result tracking",
        "Decentralized storage",
        "Audit trail functionality"
      ],
      lessonsLearned: [
        "Gas optimization is crucial for blockchain applications",
        "Smart contract security requires extensive testing",
        "User experience with blockchain can be challenging"
      ],
      codeSnippets: [
        {
          id: "voting-contract",
          title: "Voting Smart Contract",
          code: `pragma solidity ^0.8.0;\n\ncontract VotingSystem {\n    struct Candidate {\n        uint id;\n        string name;\n        uint voteCount;\n    }\n    \n    mapping(address => bool) public voters;\n    mapping(uint => Candidate) public candidates;\n    uint public candidatesCount;\n    \n    event VotedEvent(uint indexed candidateId);\n    \n    function vote(uint _candidateId) public {\n        require(!voters[msg.sender], "Already voted");\n        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate");\n        \n        voters[msg.sender] = true;\n        candidates[_candidateId].voteCount++;\n        \n        emit VotedEvent(_candidateId);\n    }\n}`
        }
      ]
    },
    {
      id: 6,
      title: "Personal Finance Tracker",
      description: "Comprehensive personal finance management tool with budget tracking, expense categorization, and financial goal setting.",
      image: "https://www.istockphoto.com/photo/woman-using-laptop-at-office-checking-her-expenses-gm1342226828-421716050?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2FPersonal-Expense-Tracker-Dashboard&utm_medium=affiliate&utm_source=unsplash&utm_term=Personal+Expense+Tracker+Dashboard%3A%3Ano-top-affiliates%3Av1?w=500&h=300&fit=crop",
      category: "Financial Technology",
      techStack: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
      complexity: "Beginner",
      status: "Live",
      collaborationStatus: "Open",
      metrics: {
        linesOfCode: "4.8K",
        githubStars: "15"
      },
      githubUrl: "https://github.com/username/finance-tracker",
      demoUrl: "https://finance-tracker-demo.vercel.app",
      problemStatement: "Many people struggle to track their expenses and manage their budgets effectively.",
      solution: "Created an intuitive finance tracker with visual insights and goal-setting features.",
      features: [
        "Expense categorization",
        "Budget planning",
        "Financial goal tracking",
        "Visual reports and charts",
        "Bank account integration",
        "Bill reminders"
      ],
      lessonsLearned: [
        "Financial data requires careful security considerations",
        "User interface simplicity is key for daily-use applications",
        "Data visualization helps users understand spending patterns"
      ],
      codeSnippets: [
        {
          id: "expense-calculation",
          title: "Monthly Expense Calculation",
          code: `const calculateMonthlyExpenses = (transactions) => {\n  const currentMonth = new Date().getMonth();\n  const currentYear = new Date().getFullYear();\n  \n  return transactions\n    .filter(transaction => {\n      const transactionDate = new Date(transaction.date);\n      return transactionDate.getMonth() === currentMonth &&\n             transactionDate.getFullYear() === currentYear &&\n             transaction.type === 'expense';\n    })\n    .reduce((total, transaction) => total + transaction.amount, 0);\n};`
        }
      ]
    }
  ];

  // Filter projects based on selected criteria
  const filteredProjects = useMemo(() => {
    return projects?.filter(project => {
      const matchesTechnology = selectedTechnology === 'all' || 
        project?.techStack?.some(tech => 
          tech?.toLowerCase()?.includes(selectedTechnology?.replace('-', ' '))
        );
      
      const matchesComplexity = selectedComplexity === 'all' || 
        project?.complexity === selectedComplexity;
      
      const matchesStatus = selectedStatus === 'all' || 
        project?.status === selectedStatus;
      
      const matchesSearch = searchQuery === '' ||
        project?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        project?.techStack?.some(tech => 
          tech?.toLowerCase()?.includes(searchQuery?.toLowerCase())
        );
      
      return matchesTechnology && matchesComplexity && matchesStatus && matchesSearch;
    });
  }, [projects, selectedTechnology, selectedComplexity, selectedStatus, searchQuery]);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setSelectedTechnology('all');
    setSelectedComplexity('all');
    setSelectedStatus('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Icon name="Beaker" size={16} />
              <span>Project Laboratory</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Digital <span className="text-gradient">Experiments</span>
              <br />& Innovations
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore my collection of projects where code meets creativity. Each project represents 
              a journey of problem-solving, learning, and pushing the boundaries of what's possible 
              with modern web technologies.
            </p>

          </motion.div>

          {/* Project Stats */}
          <ProjectStats projects={projects} filteredProjects={filteredProjects} />

          {/* Filter System */}
          <FilterSystem
            selectedTechnology={selectedTechnology}
            onTechnologyChange={setSelectedTechnology}
            selectedComplexity={selectedComplexity}
            onComplexityChange={setSelectedComplexity}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters}
          />

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects?.length > 0 ? (
              filteredProjects?.map((project, index) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  onViewDetails={handleViewDetails}
                  index={index}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-16"
              >
                <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Projects Found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms to find more projects.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear All Filters
                </Button>
              </motion.div>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16 pt-16 border-t border-border"
          >
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Collaborate?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new projects and explore innovative solutions. Let's discuss how we can bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
             {new Date()?.getFullYear()} Portfolio. Built with React, Tailwind CSS, and lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectLaboratoryShowcase;