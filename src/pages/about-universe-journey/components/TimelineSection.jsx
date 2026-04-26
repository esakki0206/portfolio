import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeNodes, setActiveNodes] = useState(new Set());
  const [visibleNodes, setVisibleNodes] = useState(new Set());

  const timelineData = [
    {
      id: 'spark',
      category: 'The Beginning',
      title: 'First Line of Code',
      period: '2017 - 2018',
      icon: 'Sparkles',
      preview: 'Discovered programming through a simple "Hello World" in Python and fell in love with coding.',
      fullDescription: `My journey into Computer Science began with curiosity and a simple Python tutorial. What started as a normal homework activity quickly became an obsession. I spent countless hours experimenting with basic algorithms, creating simple games, and falling in love with the logic and creativity that programming offered. This moment sparked a passion that would define my academic and career path.`,
      tags: ['Python', 'First Steps', 'Discovery', 'School'],
      media: {
        code: `print("Hello, World!")
# My very first program
name = input("What's your name? ")
print(f"Nice to meet you, {name}!")`,
        codeLanguage: 'Python'
      },
      links: []
    },
    {
      id: 'high-school',
      category: 'Academic Foundation',
      title: 'High School Excellence',
      period: '2008 - 2023',
      icon: 'GraduationCap',
      preview: 'Graduated with academic excellence, specializing in STEM subjects and early exposure to programming.',
      fullDescription: `During high school, I maintained an 80% average while taking every available computer science course, actively exploring programming, algorithms, and web development to build a solid foundation in computational thinking and problem-solving.`,
      tags: ['Academic Excellence' , 'Web Development', '80%'],
      media: {
        achievement: 'Academic Excellence - Class of 2022',
        achievementDetails: 'Graduated with 80% average, top 10% of class'
      },
      links: [
        { label: 'Senior Project Demo', url: '#', icon: 'ExternalLink' }
      ]
    },
    {
      id: 'university-start',
      category: 'Higher Education',
      title: 'University Journey Begins',
      period: 'summer 2023',
      icon: 'BookOpen',
      preview: 'Started Computer Science degree and immediate involvement in tech world.',
      fullDescription: `Began my Computer Science degree at St. Joseph’s College (Autonomous).In the first semester, completed courses in Data Structures, Numerical Methods, and Python Programming, achieving a GPA of 8.4. Successfully adapted to university-level coursework while building strong foundations in computing and forming meaningful collaborations with fellow CS students.`,
      tags: ['Computer Science', 'Scholarship', 'Data Structures', '8.5 GPA'],
      media: {
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop'
      },
      links: []
    },
 {
  id: 'first-innovathon',
  category: 'Competitive Spirit',
  title: 'First Innovathon Participation',
  period: 'Summer 2024',
  icon: 'Trophy',
  preview: 'Participated in a university hackathon, building a "Budget-Friendly CCTV" prototype using Arduino IDE and ESP32-CAM.',
  fullDescription: `My first innovathon experience was transformative. Working with a team of three other freshmen, we developed “Budget-Friendly CCTV”, a prototype for a low-cost, student-built surveillance system programmed through the Arduino IDE and powered by the ESP32-CAM module. Despite being newcomers, we successfully built a functional prototype by focusing on practicality, usability, and teamwork under pressure. This experience taught me the importance of rapid prototyping and building technology that solves real-world problems.`,
  tags: ['Innovathon', 'CCTV', 'Team Collaboration', 'Arduino IDE', 'ESP32-CAM', 'Problem-Solving'],
  media: {
    achievement: 'Hackathon Participation',
    achievementDetails: 'Built a functional CCTV prototype using Arduino IDE',
    code: `// ESP32-CAM setup with Arduino IDE
#include "esp_camera.h"

void setup() {
  Serial.begin(115200);

  camera_config_t config;
  // configure pins and camera settings here
  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera init failed!");
    return;
  }

  Serial.println("ESP32-CAM ready for streaming...");
}

void loop() {
  // Capture a frame
  camera_fb_t * fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Frame capture failed");
    return;
  }

  // Return frame buffer
  esp_camera_fb_return(fb);
}`,
    codeLanguage: 'Arduino'
  },
},

    {
  id: 'internship-search',
  category: 'Professional Growth',
  title: 'First Internship',
  period: 'Spring 2024',
  icon: 'Briefcase',
  preview: 'Secured a Full Stack development internship at Free Will Technologies, working on a web-based Resume Builder application.',
  fullDescription: `Landed my first internship at Free Will Technologies, a growing startup focused on business automation tools. As a junior developer, I worked on building a web-based Resume Builder application using React, PHP, and MySQL. My responsibilities included designing the frontend interface, integrating backend APIs, and managing database operations for user resumes. I collaborated closely with senior developers through code reviews, which strengthened my understanding of scalable web app development and industry best practices.`,
  tags: ['Internship', 'Full-Stack', 'React', 'PHP', 'MySQL', 'Resume Builder'],
  media: {
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    code: `// Sample PHP backend route for saving resume data
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $resumeData = $_POST['resume'];

    // Get database credentials from environment variables
    $dbHost = getenv('DB_HOST');        // e.g: 'localhost'
    $dbUser = getenv('DB_USER');        // e.g: 'root'
    $dbPassword = getenv('DB_PASSWORD');// e.g:'password'
    $dbName = getenv('DB_NAME');        // e.g: 'resume_builder'

    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO resumes (name, email, data) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $resumeData);
    $stmt->execute();

    echo "Resume saved successfully!";
}
?>
`,
    codeLanguage: 'PHP'
  },
  links: [
    { label: 'Resume_Builder Website', url: 'https://resumebuilder.freewilltech.in/', icon: 'ExternalLink' }
  ]
},
    {
      id: 'advanced-courses',
      category: 'Academic Excellence',
      title: 'Advanced Coursework',
      period: 'Fall 2024 - Present',
      icon: 'Brain',
      preview: 'Excelling in advanced CS courses including Algorithms, Database Systems, and Machine Learning.',
      fullDescription: `Implemented Merge Sort, Quick Sort, BFS, DFS, and Dijkstra’s Algorithm for large datasets and pathfinding problems. Designed and normalized an e-commerce database with advanced SQL queries and indexing, improving query performance by 40%. Built a CNN in TensorFlow for CIFAR-10 image classification, achieving 94% test accuracy through data augmentation and optimization.`,
      tags: ['Algorithms', 'Database Systems', 'Machine Learning', 'Neural Networks', '8.5 GPA'],
      media: {
        code: `# Machine Learning model I built
import tensorflow as tf
from tensorflow.keras import layers

model = tf.keras.Sequential([
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)`,
        codeLanguage: 'Python'
      },
      links: [
        { label: 'ML Project Report', url: '#', icon: 'FileText' }
      ]
    },
    {
      id: 'future-vision',
      category: 'Future Aspirations',
      title: 'Building Tomorrow',
      period: '2024 & Beyond',
      icon: 'Rocket',
      preview: 'Focused on AI/ML specialization, graduate school preparation, and impactful technology solutions.',
      fullDescription: `Looking ahead, I'm excited to specialize in artificial intelligence and machine learning, with plans to pursue graduate studies in Computer Science. My goal is to work on AI systems that solve real-world problems - from healthcare diagnostics to climate change solutions. I'm currently preparing for graduate school applications while building a portfolio of AI projects. My ultimate vision is to lead a team of engineers in developing technology that makes a meaningful positive impact on society, whether through a tech company, research institution, or my own startup.`,
      tags: ['AI/ML', 'Graduate School', 'Research', 'Leadership', 'Social Impact', 'Innovation'],
      media: {
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
      },
      links: [
        { label: 'Research Interests', url: '#', icon: 'BookOpen' }
      ]
    }
  ];

  const handleNodeToggle = (nodeId) => {
    setActiveNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nodeId = entry.target.getAttribute('data-node-id');
            if (nodeId) {
              setVisibleNodes(prev => new Set([...prev, nodeId]));
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const nodeElements = document.querySelectorAll('[data-node-id]');
    nodeElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-16 px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
            <Icon name="MapPin" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">My Journey</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
            The Story So Far
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From first lines of code to future aspirations - explore the key moments 
            that have shaped my journey in Computer Science and technology.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-accent/50 via-success/50 to-accent/50"></div>
          
          {/* Timeline Nodes */}
          <div className="space-y-16">
            {timelineData.map((node, index) => (
              <div
                key={node.id}
                data-node-id={node.id}
                className={`relative ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2 lg:text-right'}`}
              >
                <TimelineNode
                  node={node}
                  index={index}
                  isActive={activeNodes.has(node.id)}
                  onToggle={handleNodeToggle}
                  side={index % 2 === 0 ? 'left' : 'right'}
                />
              </div>
            ))}
          </div>

          {/* Timeline End Marker */}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
          >
            <Icon name="Sparkles" size={16} className="text-background" />
          </motion.div>
        </div>

        {/* Interactive Stats */}
        <motion.div
          variants={headerVariants}
          className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Years Coding', value: '6+', icon: 'Code2' },
            { label: 'Projects Built', value: '5+', icon: 'FolderOpen' },
            { label: 'Hackathons', value: '1', icon: 'Trophy' },
            { label: 'GPA', value: '8.5', icon: 'Star' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-card p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={20} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;