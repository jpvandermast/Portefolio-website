import React from 'react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('HomePage');
  return (
    <Container>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'HomePage' }]} title="HomePage" />
    </Container>
  );
}
