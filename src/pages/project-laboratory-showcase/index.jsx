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

  // Real project data based on actual experience
  const projects = [
    {
      id: 1,
      title: 'Web-Based Resume Builder',
      description:
        'A full-stack Resume Builder web application developed during my internship at Free Will Technologies. Users can create, edit, and download professional resumes through an intuitive interface backed by a PHP + MySQL server.',
      image:
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop',
      category: 'Full Stack Development',
      techStack: ['React', 'PHP', 'MySQL', 'CSS', 'REST API'],
      complexity: 'Intermediate',
      status: 'Live',
      collaborationStatus: 'Closed',
      metrics: {
        linesOfCode: '4.2K',
        githubStars: '—',
      },
      githubUrl: null,
      demoUrl: 'https://resumebuilder.freewilltech.in/',
      problemStatement:
        'Job seekers needed an accessible, web-based tool to quickly create professional resumes without relying on expensive desktop software.',
      solution:
        'Built a full-stack application with React on the frontend and PHP/MySQL on the backend, allowing users to fill in their details, preview the resume live, and download it as a PDF.',
      features: [
        'Live preview of the resume as you type',
        'Multiple resume templates',
        'PDF download functionality',
        'Secure user data storage via MySQL',
        'Responsive design for all screen sizes',
        'REST API integration between React and PHP backend',
      ],
      lessonsLearned: [
        'Integrating a React frontend with a PHP backend taught me to design clean API contracts',
        'Managing database schemas for dynamic user data sharpened my SQL skills',
        'Working within a startup timeline improved my rapid prototyping and prioritisation abilities',
      ],
      codeSnippets: [
        {
          id: 'save-resume',
          title: 'PHP Backend — Save Resume',
          code: `<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = $_POST['name'];
    $email    = $_POST['email'];
    $resumeData = $_POST['resume'];

    $conn = new mysqli(
        getenv('DB_HOST'), getenv('DB_USER'),
        getenv('DB_PASSWORD'), getenv('DB_NAME')
    );

    $stmt = $conn->prepare(
        "INSERT INTO resumes (name, email, data) VALUES (?, ?, ?)"
    );
    $stmt->bind_param("sss", $name, $email, $resumeData);
    $stmt->execute();

    echo json_encode(["status" => "saved"]);
}
?>`,
        },
      ],
    },
    {
      id: 2,
      title: 'Budget-Friendly CCTV (Innovathon)',
      description:
        'A low-cost, DIY surveillance prototype built for a university Innovathon. Powered by an ESP32-CAM module and programmed via the Arduino IDE, the system streams live video over a local Wi-Fi network — giving students a real-world IoT experience at minimal cost.',
      image:
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop',
      category: 'IoT / Embedded Systems',
      techStack: ['Arduino IDE', 'ESP32-CAM', 'C++', 'Wi-Fi Streaming', 'IoT'],
      complexity: 'Intermediate',
      status: 'Completed',
      collaborationStatus: 'Closed',
      metrics: {
        linesOfCode: '~600',
        githubStars: '—',
      },
      githubUrl: null,
      demoUrl: null,
      problemStatement:
        'Commercial CCTV systems are expensive and complex to install. Students needed a proof-of-concept showing that surveillance hardware could be built on a shoestring budget.',
      solution:
        'Designed a standalone camera node using the ESP32-CAM that streams MJPEG video over HTTP to any browser on the same Wi-Fi network, achieving a functional prototype for under ₹500.',
      features: [
        'Live MJPEG video stream accessible via browser',
        'Auto-reconnect to Wi-Fi on power cycle',
        'Configurable resolution and frame rate',
        'Minimal external components (no additional MCU required)',
        'Single-file Arduino sketch for easy deployment',
      ],
      lessonsLearned: [
        'Working within tight hardware constraints improved my low-level programming mindset',
        'Debugging embedded systems without a debugger built strong systematic thinking',
        'Rapid hardware prototyping under a hackathon deadline is very different from software sprints',
      ],
      codeSnippets: [
        {
          id: 'esp32-setup',
          title: 'ESP32-CAM Arduino Setup',
          code: `#include "esp_camera.h"
#include <WiFi.h>
#include "esp_http_server.h"

const char* ssid     = "YOUR_SSID";
const char* password = "YOUR_PASS";

void setup() {
  Serial.begin(115200);

  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.pin_d0 = Y2_GPIO_NUM;
  // ... additional pin config ...
  config.frame_size  = FRAMESIZE_QVGA;
  config.jpeg_quality = 12;
  config.fb_count    = 1;

  if (esp_camera_init(&config) != ESP_OK) {
    Serial.println("Camera init failed!");
    return;
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("\\nCamera ready at: http://" + WiFi.localIP().toString());
  startCameraServer();
}

void loop() { delay(10000); }`,
        },
      ],
    },
    {
      id: 3,
      title: 'CIFAR-10 Image Classifier (CNN)',
      description:
        'A Convolutional Neural Network trained on the CIFAR-10 dataset as part of advanced coursework in Machine Learning. Achieved 94% test accuracy using data augmentation, dropout regularisation, and Adam optimiser fine-tuning.',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      category: 'Machine Learning',
      techStack: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Matplotlib'],
      complexity: 'Advanced',
      status: 'Completed',
      collaborationStatus: 'Closed',
      metrics: {
        linesOfCode: '~350',
        githubStars: '—',
      },
      githubUrl: null,
      demoUrl: null,
      problemStatement:
        'Image classification is a core ML task. The challenge was to build a CNN from scratch that generalises well to the 10-class CIFAR-10 dataset without overfitting.',
      solution:
        'Designed a multi-layer CNN with convolutional blocks, max-pooling, dropout, and batch normalisation. Applied data augmentation (random flips, rotations) to improve generalisation.',
      features: [
        '94% test accuracy on CIFAR-10',
        'Data augmentation pipeline (flips, crops, brightness)',
        'Batch normalisation for stable training',
        'Dropout layers to prevent overfitting',
        'Training/validation loss and accuracy plots',
        'Confusion matrix visualisation',
      ],
      lessonsLearned: [
        'Data augmentation had a larger impact on accuracy than increasing model depth',
        'Batch normalisation dramatically reduced training instability',
        'Visualising filters and activations helped debug unexpected behaviour',
      ],
      codeSnippets: [
        {
          id: 'cnn-model',
          title: 'CNN Model Architecture',
          code: `import tensorflow as tf
from tensorflow.keras import layers, models

def build_cnn(input_shape=(32, 32, 3), num_classes=10):
    model = models.Sequential([
        # Block 1
        layers.Conv2D(32, (3, 3), activation='relu', padding='same',
                      input_shape=input_shape),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),

        # Block 2
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),

        # Classifier
        layers.Flatten(),
        layers.Dense(512, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(num_classes, activation='softmax'),
    ])
    model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    return model

model = build_cnn()
model.summary()  # ~1.2M parameters`,
        },
      ],
    },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTechnology =
        selectedTechnology === 'all' ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(selectedTechnology.replace('-', ' '))
        );

      const matchesComplexity =
        selectedComplexity === 'all' || project.complexity === selectedComplexity;

      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus;

      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
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
              <Icon name="Code2" size={16} />
              <span>Project Showcase</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Real <span className="text-gradient">Projects</span>
              <br />
              Real Impact
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Every project here represents a genuine problem I tackled — during my internship,
              hackathon, or coursework. Code that runs in production, hardware that was held in
              hands, and models trained on real datasets.
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
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Collaborate?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              I'm always excited to work on new challenges and explore innovative solutions.
              Let's discuss how we can build something great together.
            </p>
            <Button
              variant="default"
              size="lg"
              onClick={() => window.open('https://www.linkedin.com/in/esakkiappan-e-b24893343', '_blank')}
              iconName="Linkedin"
              iconPosition="left"
              className="magnetic-button neon-glow-hover"
            >
              Connect on LinkedIn
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Esakkiappan E. Built with React, Tailwind CSS &amp; lots of ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProjectLaboratoryShowcase;
