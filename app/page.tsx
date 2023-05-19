'use client';

import { useState } from 'react';

import Container from './components/UI/Container';
import EmptyState from './components/EmptyState';

export default function Home() {
  const [isEmpty, setEmpty] = useState(true);

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <div>My future listings</div>
      </div>
    </Container>
  );
}
