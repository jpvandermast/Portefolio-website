import React from 'react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';

export default function AboutPage() {
  return (
    <Container>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'AboutPage' }]} title="AboutPage" />
    </Container>
  );
}
