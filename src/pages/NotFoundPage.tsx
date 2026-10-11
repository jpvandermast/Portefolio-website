import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router';
import { NAV_ITEMS } from '../data/navigation';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Breadcrumbs } from '../components/ui/PageHeader';
import { useSearch } from '../lib/SearchContext';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Pagina niet gevonden');
  const { openSearch } = useSearch();
  return (
    <Container className="pt-8 sm:pt-12 pb-24">
      <Breadcrumbs crumbs={[{ label: 'Home', to: '/' }, { label: 'Niet gevonden' }]} />
      <div className="mt-12 sm:mt-20 max-w-2xl">
        <p className="font-mono text-[0.8rem] tracking-[0.12em] text-accent">FOUT 404</p>
        <h1 id="page-title" tabIndex={-1} className="mt-3 text-h1 focus:outline-none">
          Deze pagina bestaat niet (meer)
        </h1>
        <p className="mt-4 text-lead text-muted">
          Misschien is de link veranderd of zit er een typfout in. Zoek het bewijsstuk op, of ga verder via een van de pagina's hieronder.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button onClick={openSearch} size="lg">
            <Search className="w-4 h-4" aria-hidden="true" />
            Zoeken
          </Button>
          <Button to="/" variant="secondary" size="lg">
            Naar de homepage
          </Button>
        </div>
      </div>
      <ul className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <Link to={item.to} className="group flex flex-col h-full rounded-card bg-card p-5 ring-1 ring-line shadow-card transition-[box-shadow,transform] hover:shadow-lift hover:-translate-y-0.5">
              <span className="flex items-center justify-between font-medium text-ink group-hover:text-accent">
                {item.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              <span className="mt-1 text-[0.85rem] text-muted">{item.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
