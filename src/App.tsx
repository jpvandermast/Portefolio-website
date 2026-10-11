import React, { lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Layout } from './components/layout/Layout';

// Elke pagina is een eigen chunk (code-splitting)
const HomePage = lazy(() => import('./pages/HomePage'));
const StoriesPage = lazy(() => import('./pages/StoriesPage'));
const StoryPage = lazy(() => import('./pages/StoryPage'));
const LearningOutcomesPage = lazy(() => import('./pages/LearningOutcomesPage'));
const LearningOutcomePage = lazy(() => import('./pages/LearningOutcomePage'));
const SprintsPage = lazy(() => import('./pages/SprintsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="stories" element={<StoriesPage />} />
        {/* Deze URL staat in ingeleverde opdrachten: nooit wijzigen */}
        <Route path="stories/:slug" element={<StoryPage />} />
        <Route path="leeruitkomsten" element={<LearningOutcomesPage />} />
        <Route path="leeruitkomsten/:lu" element={<LearningOutcomePage />} />
        <Route path="sprints" element={<SprintsPage />} />
        <Route path="over-mij" element={<AboutPage />} />
        <Route path="projecten" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
