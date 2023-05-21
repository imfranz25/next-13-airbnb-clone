import getCurrentUser from '../helpers/getCurrentUser';
import getFavoriteListings from '../helpers/getFavoriteListings';

import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized user" subtitle="" />;
  }

  const listings = await getFavoriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState title="No favorites found" subtitle="Looks like you have no favorites listing" />
    );
  }

  return <FavoritesClient listings={listings} currentUser={currentUser} />;
};

export default FavoritesPage;
