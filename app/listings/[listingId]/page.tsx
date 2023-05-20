import getListingById from '@/app/helpers/getListingById';
import getCurrentUser from '@/app/helpers/getCurrentUser';
import getReservations from '../../helpers/getReservations';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const reservations = await getReservations(params);
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState title="List not found" subtitle="Check our other listings in our home page" />
    );
  }
  return <ListingClient listing={listing} currentUser={currentUser} reservations={reservations} />;
};

export default ListingPage;
