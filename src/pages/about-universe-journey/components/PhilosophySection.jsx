import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const PhilosophySection = () => {
  const [activePhilosophy, setActivePhilosophy] = useState(0);

  const philosophies = [
    {
      id: 'clean-code',
      title: 'Clean Code Philosophy',
      icon: 'Code2',
      description: 'Code should tell a story that any developer can read and understand.',
      principles: [
        'Write code for humans, not just computers',
        'Meaningful names reveal intent clearly',
        'Functions should do one thing well',
        'Comments explain why, not what'
      ],
      quote: `"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler`
    },
    {
      id: 'user-experience',
      title: 'User-Centric Design',
      icon: 'Users',
      description: 'Technology should enhance human capabilities, not complicate them.',
      principles: [
        'Empathy drives every design decision',
        'Accessibility is not optional',
        'Performance impacts user satisfaction',
        'Simplicity is the ultimate sophistication'
      ],
      quote: `"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs`
    },
    {
      id: 'innovation',
      title: 'Innovation Mindset',
      icon: 'Lightbulb',
      description: 'Embrace emerging technologies while solving real-world problems.',
      principles: [
        'Question existing solutions continuously',
        'Experiment with cutting-edge technologies',
        'Learn from failures and iterate quickly',
        'Focus on impact over complexity'
      ],
      quote: `"Innovation distinguishes between a leader and a follower." - Steve Jobs`
    },
    {
      id: 'collaboration',
      title: 'Collaborative Growth',
      icon: 'Users2',
      description: 'Great software is built by great teams working together.',
      principles: [
        'Share knowledge generously with others',
        'Listen actively to different perspectives',
        'Mentor others while learning continuously',
        'Build bridges between technical and non-technical teams'
      ],
      quote: `"If you want to go fast, go alone. If you want to go far, go together." - African Proverb`
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-16 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
            <Icon name="Brain" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Technical Philosophy</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gradient mb-4">
            My Approach to Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles and beliefs that guide my development journey and shape how I approach problem-solving.
          </p>
        </motion.div>

        {/* Philosophy Navigation */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 mb-8">
          {philosophies?.map((philosophy, index) => (
            <button
              key={philosophy?.id}
              onClick={() => setActivePhilosophy(index)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                activePhilosophy === index
                  ? 'bg-accent text-background' :'bg-muted/20 text-muted-foreground hover:bg-muted/30 hover:text-foreground'
              }`}
            >
              <Icon name={philosophy?.icon} size={16} />
              <span className="hidden sm:inline">{philosophy?.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Philosophy Content */}
        <motion.div
          key={activePhilosophy}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-success rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={philosophies?.[activePhilosophy]?.icon} size={24} className="text-background" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {philosophies?.[activePhilosophy]?.title}
                  </h3>
                  <p className="text-muted-foreground text-lg">
                    {philosophies?.[activePhilosophy]?.description}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="border-l-4 border-accent pl-6 py-4 bg-accent/5 rounded-r-lg">
                <p className="text-foreground italic text-lg leading-relaxed">
                  {philosophies?.[activePhilosophy]?.quote}
                </p>
              </blockquote>
            </div>

            {/* Right Column - Principles */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span>Core Principles</span>
              </h4>
              <div className="space-y-3">
                {philosophies?.[activePhilosophy]?.principles?.map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-muted/10 rounded-lg border border-muted/20"
                  >
                    <div className="w-6 h-6 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={14} className="text-success" />
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {principle}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal Touch */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Icon name="Heart" size={20} className="text-error" />
              <span className="text-lg font-semibold text-foreground">What Drives Me</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm passionate about creating technology that makes a meaningful difference in people's lives. 
              Whether it's building accessible web applications, optimizing performance for better user experiences, 
              or mentoring fellow developers, I believe that our code should serve humanity and push the boundaries 
              of what's possible. Every line of code is an opportunity to solve problems, create connections, 
              and build a better digital future.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PhilosophySection;