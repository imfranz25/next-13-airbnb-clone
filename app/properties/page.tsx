import getCurrentUser from '../helpers/getCurrentUser';

import PropertiesClient from './PropertiesClient';
import EmptyState from '../components/EmptyState';
import getListings from '../helpers/getListings';

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return <EmptyState title="No properties found" subtitle="Looks like you have no properties" />;
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default page;
