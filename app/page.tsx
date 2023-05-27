import getListings, { IListingParams } from './helpers/getListings';
import getCurrentUser from './helpers/getCurrentUser';

import Container from './components/UI/Container';
import EmptyState from './components/EmptyState';
import ListingCard from './components/Listings/ListingCard';

interface HomeProps {
  searchParams: IListingParams;
}

const Home = async ({ searchParams }: HomeProps) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} data={listing} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
};

export default Home;

export const dynamic = 'force-dynamic';
