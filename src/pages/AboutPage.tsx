import React from 'react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function AboutPage() {
  useDocumentTitle('AboutPage');
  return (
    <Container>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'AboutPage' }]} title="AboutPage" />
    </Container>
  );
}
