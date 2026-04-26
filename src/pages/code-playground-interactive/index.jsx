import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';
import DataStructurePlayground from './components/DataStructurePlayground';
import LiveCodeEditor from './components/LiveCodeEditor';
import CodeChallenges from './components/CodeChallenges';
import InteractiveDemo from './components/InteractiveDemo';
import Icon from '../../components/AppIcon';

const CodePlaygroundInteractive = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Code Playground Interactive - CodeSphere Portfolio</title>
        <meta name="description" content="Interactive coding environment with algorithm visualizations, data structure playgrounds, and live code challenges. Experience Computer Science concepts through hands-on demonstrations." />
        <meta name="keywords" content="code playground, algorithm visualization, data structures, interactive coding, programming challenges, computer science" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                <Icon name="Code2" size={16} />
                <span>Interactive Learning Environment</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Code <span className="text-gradient">Playground</span>
                <br />Interactive
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Dive into the world of algorithms and data structures through interactive visualizations. 
                Watch sorting algorithms come to life, manipulate data structures in real-time, and solve 
                coding challenges with immediate feedback.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-muted/20 rounded-lg">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">Real-time Execution</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-muted/20 rounded-lg">
                  <Icon name="Eye" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">Visual Learning</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-muted/20 rounded-lg">
                  <Icon name="Target" size={16} className="text-warning" />
                  <span className="text-sm text-muted-foreground">Hands-on Practice</span>
                </div>
              </div>
            </div>

            {/* Featured Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 glass-card">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="BarChart3" size={24} className="text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Algorithm Visualizations</div>
              </div>
              
              <div className="text-center p-6 glass-card">
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Database" size={24} className="text-success" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">8</div>
                <div className="text-sm text-muted-foreground">Data Structures</div>
              </div>
              
              <div className="text-center p-6 glass-card">
                <div className="w-12 h-12 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Code" size={24} className="text-warning" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">4</div>
                <div className="text-sm text-muted-foreground">Programming Languages</div>
              </div>
              
              <div className="text-center p-6 glass-card">
                <div className="w-12 h-12 bg-error/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name="Trophy" size={24} className="text-error" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Coding Challenges</div>
              </div>
            </div>
          </div>
        </section>

        {/* Algorithm Visualizer Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Algorithm <span className="text-gradient">Visualizations</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Watch sorting and searching algorithms in action. Understand time complexity 
                through visual demonstrations and step-by-step execution.
              </p>
            </div>
            
            <AlgorithmVisualizer />
          </div>
        </section>

        {/* Data Structure Playground Section */}
        <section className="py-16 px-6 lg:px-8 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Data Structure <span className="text-gradient">Playground</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Interact with fundamental data structures. Add, remove, and manipulate elements 
                to understand how different structures organize and access data.
              </p>
            </div>
            
            <DataStructurePlayground />
          </div>
        </section>

        {/* Live Code Editor Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Live Code <span className="text-gradient">Editor</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Write, execute, and share code snippets in multiple programming languages. 
                Perfect for testing algorithms and sharing solutions.
              </p>
            </div>
            
            <LiveCodeEditor />
          </div>
        </section>

        {/* Code Challenges Section */}
        <section className="py-16 px-6 lg:px-8 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Coding <span className="text-gradient">Challenges</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Solve algorithmic problems with detailed explanations, hints, and complexity analysis. 
                Practice interview-style questions with immediate feedback.
              </p>
            </div>
            
            <CodeChallenges />
          </div>
        </section>

        {/* Interactive Demos Section */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Interactive <span className="text-gradient">Demonstrations</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Experience advanced concepts through real-time simulations. From pathfinding 
                algorithms to machine learning training and API integrations.
              </p>
            </div>
            
            <InteractiveDemo />
          </div>
        </section>

        {/* Features Overview */}
        <section className="py-16 px-6 lg:px-8 bg-muted/5">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                Why Use the <span className="text-gradient">Playground</span>?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Eye" size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Visual Learning</h3>
                <p className="text-muted-foreground">
                  See algorithms and data structures in action through interactive visualizations 
                  that make complex concepts easy to understand.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Real-time Execution</h3>
                <p className="text-muted-foreground">
                  Write and run code instantly with immediate feedback. Test your solutions 
                  and see results in real-time without any setup.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-warning/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="BookOpen" size={32} className="text-warning" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Educational Focus</h3>
                <p className="text-muted-foreground">
                  Every feature is designed for learning with detailed explanations, 
                  complexity analysis, and step-by-step breakdowns.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-error/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Share2" size={32} className="text-error" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Share & Collaborate</h3>
                <p className="text-muted-foreground">
                  Share your code snippets and solutions with others. Perfect for 
                  collaborative learning and code reviews.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Smartphone" size={32} className="text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Mobile Friendly</h3>
                <p className="text-muted-foreground">
                  Optimized for all devices with touch-friendly controls and 
                  responsive layouts for learning on the go.
                </p>
              </div>

              <div className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Layers" size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Multi-Language</h3>
                <p className="text-muted-foreground">
                  Support for JavaScript, Python, React, SQL, and more. Practice 
                  in your preferred programming language.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-card p-8 lg:p-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Ready to Start <span className="text-gradient">Coding</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore the interactive playground and enhance your programming skills through 
                hands-on practice and visual learning. Perfect for students, developers, and 
                anyone passionate about Computer Science.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => document.querySelector('#algorithm-visualizer')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent/90 transition-colors duration-200 neon-glow-hover"
                >
                  Start Exploring
                </button>
                <button 
                  onClick={() => window.open('https://github.com', '_blank')}
                  className="px-8 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  View Source Code
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 lg:px-8 border-t border-border">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground">
               {new Date()?.getFullYear()} Esakkiappan Portfolio. Built with React, Tailwind CSS, and passion for education.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CodePlaygroundInteractive;