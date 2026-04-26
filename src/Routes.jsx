import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import HeroExperienceLanding from './pages/hero-experience-landing';
import ProjectLaboratoryShowcase from './pages/project-laboratory-showcase';
import SkillsObservatoryVisualization from './pages/skills-observatory-visualization';
import AchievementGalleryTimeline from './pages/achievement-gallery-timeline';
import AboutUniverseJourney from './pages/about-universe-journey';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<HeroExperienceLanding />} />
          <Route path="/projects" element={<ProjectLaboratoryShowcase />} />
          <Route path="/skills" element={<SkillsObservatoryVisualization />} />
          <Route path="/about" element={<AboutUniverseJourney />} />
          <Route path="/achievements" element={<AchievementGalleryTimeline />} />
          {/* Legacy redirects */}
          <Route path="/hero-experience-landing" element={<HeroExperienceLanding />} />
          <Route path="/project-laboratory-showcase" element={<ProjectLaboratoryShowcase />} />
          <Route path="/skills-observatory-visualization" element={<SkillsObservatoryVisualization />} />
          <Route path="/achievement-gallery-timeline" element={<AchievementGalleryTimeline />} />
          <Route path="/about-universe-journey" element={<AboutUniverseJourney />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
