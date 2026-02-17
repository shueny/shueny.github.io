import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ProjectsGridComp from '../ProjectsGrid';

const ProjectsGridIsland: React.FC = () => (
  <LanguageProvider>
    <ProjectsGridComp />
  </LanguageProvider>
);

export default ProjectsGridIsland;
