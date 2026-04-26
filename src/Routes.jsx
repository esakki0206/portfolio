import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CodePlaygroundInteractive from './pages/code-playground-interactive';
import ProjectLaboratoryShowcase from './pages/project-laboratory-showcase';
import SkillsObservatoryVisualization from './pages/skills-observatory-visualization';
import HeroExperienceLanding from './pages/hero-experience-landing';
import AchievementGalleryTimeline from './pages/achievement-gallery-timeline';
import AboutUniverseJourney from './pages/about-universe-journey';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AboutUniverseJourney />} />
        <Route path="/code-playground-interactive" element={<CodePlaygroundInteractive />} />
        <Route path="/project-laboratory-showcase" element={<ProjectLaboratoryShowcase />} />
        <Route path="/skills-observatory-visualization" element={<SkillsObservatoryVisualization />} />
        <Route path="/hero-experience-landing" element={<HeroExperienceLanding />} />
        <Route path="/achievement-gallery-timeline" element={<AchievementGalleryTimeline />} />
        <Route path="/about-universe-journey" element={<AboutUniverseJourney />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
