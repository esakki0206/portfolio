import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeNodes, setActiveNodes] = useState(new Set());

  const timelineData = [
    {
      id: 'spark',
      category: 'The Beginning',
      title: 'First Line of Code',
      period: '2017 – 2018',
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
      period: '2008 – 2023',
      icon: 'GraduationCap',
      preview: 'Graduated with 80% average, specialising in STEM subjects and early exposure to programming.',
      fullDescription: `During high school, I maintained an 80% average while taking every available computer science course, actively exploring programming, algorithms, and web development to build a solid foundation in computational thinking and problem-solving.`,
      tags: ['Academic Excellence', 'Web Development', '80%'],
      media: {
        achievement: 'Academic Excellence — Class of 2023',
        achievementDetails: 'Graduated with 80% average, top 10% of class'
      },
      links: []
    },
    {
      id: 'university-start',
      category: 'Higher Education',
      title: 'University Journey Begins',
      period: 'Summer 2023',
      icon: 'BookOpen',
      preview: 'Started B.Sc. Computer Science at St. Joseph\'s College (Autonomous) with an 8.5 GPA.',
      fullDescription: `Began my Computer Science degree at St. Joseph's College (Autonomous). In the first semester, completed courses in Data Structures, Numerical Methods, and Python Programming, achieving a GPA of 8.5. Successfully adapted to university-level coursework while building strong foundations in computing. Secured 1st Rank and maintained it consistently across all five semesters.`,
      tags: ['Computer Science', '8.5 GPA', '1st Rank', 'Data Structures'],
      media: {
        achievement: '1st Rank Holder — Semesters 1–5',
        achievementDetails: 'Consistently topped the class with 8.5 GPA, earning ₹1,000 in rank prizes'
      },
      links: []
    },
    {
      id: 'first-hackathon',
      category: 'Competitive Spirit',
      title: 'Hackathon Win & Tech Competitions',
      period: 'Summer 2024',
      icon: 'Trophy',
      preview: 'Won intra-college hackathon (₹2,000), built Electro Plant X at PITCHFEST, participated in FinTech hackathon, and won inter-college prizes.',
      fullDescription: `A defining year for competitive achievements. Won 1st place at the intra-college hackathon building "Budget-Friendly CCTV" — a low-cost surveillance prototype using ESP32-CAM and Arduino IDE, earning a ₹2,000 cash prize. Built "Electro Plant X" at the PITCHFEST hackathon — an innovative IoT-based prototype. Participated in a Financial Tech hackathon, gaining exposure to fintech solutions. Also secured 1st Prize in Technical Quiz at NACOTECH-2025 (inter-college event) and 2nd Prize in Python Debugging at SRM Technical Symposium. These experiences sharpened my problem-solving speed, teamwork, and ability to perform under pressure.`,
      tags: ['Hackathon Winner', 'PITCHFEST', 'FinTech', 'NACOTECH-2025', 'SRM Symposium', '₹2,000 Prize'],
      media: {
        achievement: 'Multiple Competition Wins',
        achievementDetails: '1st Place Hackathon (₹2,000) · 1st Prize Technical Quiz (NACOTECH-2025) · 2nd Prize Python Debugging (SRM)',
        code: `// ESP32-CAM setup — Hackathon winning project
#include "esp_camera.h"

void setup() {
  Serial.begin(115200);
  camera_config_t config;
  // Configure pins and camera settings
  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera init failed!");
    return;
  }
  Serial.println("ESP32-CAM ready for streaming...");
}

void loop() {
  camera_fb_t *fb = esp_camera_fb_get();
  if (!fb) {
    Serial.println("Frame capture failed");
    return;
  }
  esp_camera_fb_return(fb);
}`,
        codeLanguage: 'Arduino'
      },
      links: []
    },
    {
      id: 'internship',
      category: 'Professional Growth',
      title: 'First Production Internship',
      period: 'Spring 2024',
      icon: 'Briefcase',
      preview: 'Full-stack development internship at Free Will Technologies — built a production Resume Builder app.',
      fullDescription: `Landed my first internship at Free Will Technologies, working on a web-based Resume Builder application using React, PHP, and MySQL. Designed the frontend interface, integrated backend APIs, and managed database operations. Collaborated with senior developers through code reviews, strengthening my understanding of scalable web app development and industry best practices.`,
      tags: ['Internship', 'Full-Stack', 'React', 'PHP', 'MySQL', 'Resume Builder'],
      media: {
        code: `// Sample PHP backend for saving resume data
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $resumeData = $_POST['resume'];

    $dbHost = getenv('DB_HOST');
    $dbUser = getenv('DB_USER');
    $dbPassword = getenv('DB_PASSWORD');
    $dbName = getenv('DB_NAME');

    $conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);
    $stmt = $conn->prepare(
      "INSERT INTO resumes (name, email, data) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $name, $email, $resumeData);
    $stmt->execute();
    echo "Resume saved successfully!";
}
?>`,
        codeLanguage: 'PHP'
      },
      links: [
        { label: 'Resume Builder Website', url: 'https://resumebuilder.freewilltech.in/', icon: 'ExternalLink' }
      ]
    },
    {
      id: 'certifications',
      category: 'Continuous Learning',
      title: 'NPTEL & Coursera Certifications',
      period: 'Fall 2024 – Present',
      icon: 'Award',
      preview: 'Earned 5 certified credentials in Python, Java, Data Science, Data Analysis, and Project Management from NPTEL & Coursera.',
      fullDescription: `Pursued structured online learning alongside university coursework to deepen domain expertise. Completed "Python for Data Science", "Data Analysis using Python", and "Programming in Java" through NPTEL, building fluency in critical languages. Earned "Data Science for Engineers" (NPTEL) to strengthen analytical foundations, and "Project Management: Running the Project" (Coursera) to develop professional project delivery skills.`,
      tags: ['NPTEL', 'Coursera', 'Python', 'Java', 'Data Science', 'Project Management'],
      media: {
        achievement: '5 Professional Certifications',
        achievementDetails: 'Python for Data Science · Data Analysis using Python · Programming in Java · Data Science for Engineers (NPTEL) · Project Management (Coursera)'
      },
      links: []
    },
    {
      id: 'future-vision',
      category: 'Future Aspirations',
      title: 'Building Tomorrow',
      period: '2025 & Beyond',
      icon: 'Rocket',
      preview: 'Focused on AI/ML specialisation, graduate school preparation, and building impactful technology.',
      fullDescription: `Looking ahead, I'm excited to specialise in artificial intelligence and machine learning, with plans to pursue graduate studies in Computer Science. My goal is to work on AI systems that solve real-world problems — from healthcare diagnostics to climate change solutions. I'm currently building a portfolio of AI projects while maintaining my 1st rank. My ultimate vision is to lead a team building technology that makes a meaningful positive impact on society.`,
      tags: ['AI/ML', 'Graduate School', 'Research', 'Leadership', 'Innovation'],
      media: {},
      links: []
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className="py-20 px-6 lg:px-8 bg-gradient-to-b from-background to-primary/5"
    >
      <div className="max-w-5xl mx-auto">
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
            From first lines of code to hackathon wins and production internships —
            the key moments that shaped my journey in Computer Science.
          </p>
        </motion.div>

        {/* Timeline — mobile: left-aligned line, desktop: centered alternating */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-5 md:left-1/2 md:-translate-x-px w-0.5 bg-gradient-to-b from-accent/50 via-success/50 to-accent/50" />

          <div className="space-y-12 md:space-y-16">
            {timelineData.map((node, index) => (
              <TimelineNode
                key={node.id}
                node={node}
                index={index}
                isActive={activeNodes.has(node.id)}
                onToggle={handleNodeToggle}
                side={index % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>

          {/* Timeline End Marker */}
          <motion.div
            className="absolute bottom-0 left-5 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-accent to-success rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Icon name="Sparkles" size={16} className="text-background" />
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={headerVariants}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { label: 'Years Coding', value: '3+', icon: 'Code2' },
            { label: 'Projects Built', value: '7+', icon: 'FolderOpen' },
            { label: 'Competitions', value: '5', icon: 'Trophy' },
            { label: 'Certifications', value: '5', icon: 'Award' }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="glass-card p-5 md:p-6 text-center"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-11 h-11 md:w-12 md:h-12 bg-gradient-to-br from-accent/20 to-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name={stat.icon} size={20} className="text-accent" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TimelineSection;