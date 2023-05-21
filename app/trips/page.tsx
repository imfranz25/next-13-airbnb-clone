import getCurrentUser from '../helpers/getCurrentUser';
import getReservations from '../helpers/getReservations';

import TripsClient from './TripsClient';
import EmptyState from '../components/EmptyState';

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login first" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState title="No trips found" subtitle="Looks like you haven't reserved any trips" />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default page;
