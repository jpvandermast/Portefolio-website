import React from 'react';
import { Container } from '../components/ui/Container';
import { PageHeader } from '../components/ui/PageHeader';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('NotFoundPage');
  return (
    <Container>
      <PageHeader crumbs={[{ label: 'Home', to: '/' }, { label: 'NotFoundPage' }]} title="NotFoundPage" />
    </Container>
  );
}
