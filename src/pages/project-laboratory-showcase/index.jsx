import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import FilterSystem from './components/FilterSystem';
import ProjectStats from './components/ProjectStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { projectsData } from '../../data/projectsData';

const ProjectLaboratoryShowcase = () => {
  const [selectedProject, setSelectedProject]     = useState(null);
  const [isModalOpen, setIsModalOpen]             = useState(false);
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [searchQuery, setSearchQuery]             = useState('');

  const projects = projectsData;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTechnology =
        selectedTechnology === 'all' ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(selectedTechnology.replace('-', ' '))
        );
      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((tech) =>
          tech.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesTechnology && matchesSearch;
    });
  }, [projects, selectedTechnology, searchQuery]);

  const handleViewDetails  = (project) => { setSelectedProject(project); setIsModalOpen(true); };
  const handleCloseModal   = ()          => { setIsModalOpen(false); setSelectedProject(null); };
  const handleClearFilters = ()          => { setSelectedTechnology('all'); setSearchQuery(''); };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 lg:px-8 flex-1">
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

          <ProjectStats projects={projects} filteredProjects={filteredProjects} />

          <FilterSystem
            selectedTechnology={selectedTechnology}
            onTechnologyChange={setSelectedTechnology}
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
                  Try adjusting your filters or search terms.
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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={handleCloseModal} />

      <Footer variant="minimal" />
    </div>
  );
};

export default ProjectLaboratoryShowcase;
