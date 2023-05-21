'use client';

import { SafeListing, SafeUser } from '../types';

import Container from '../components/UI/Container';
import Heading from '../components/UI/Heading';
import ListingCard from '../components/Listings/ListingCard';

interface FavoritesClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({ listings, currentUser }) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of place you have marked as favorite" center />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
