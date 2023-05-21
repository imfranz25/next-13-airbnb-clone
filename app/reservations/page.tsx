import ReservationsClient from './ReservationsClient';
import EmptyState from '../components/EmptyState';

import getReservations from '../helpers/getReservations';
import getCurrentUser from '../helpers/getCurrentUser';

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservation found"
        subtitle="Looks like you don't have any reservation in your properties"
      />
    );
  }

  return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
};

export default ReservationPage;
