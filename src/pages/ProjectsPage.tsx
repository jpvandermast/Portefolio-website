import React from 'react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';

export default function ProjectsPage() {
  return (
    <Container>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'ProjectsPage' }]} title="ProjectsPage" />
    </Container>
  );
}
