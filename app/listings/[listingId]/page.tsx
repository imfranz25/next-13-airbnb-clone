import { getListingById } from '@/app/helpers/getListingById';
import { getCurrentUser } from '@/app/helpers/getCurrentUser';

import EmptyState from '@/app/components/EmptyState';
import ListingClient from './ListingClient';

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState title="List not found" subtitle="Check our other listings in our home page" />
    );
  }
  return <ListingClient listing={listing} currentUser={currentUser} />;
};

export default ListingPage;
