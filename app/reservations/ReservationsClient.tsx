'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '../types';
import Heading from '../components/UI/Heading';
import Container from '../components/UI/Container';
import ListingCard from '../components/Listings/ListingCard';

interface ReservationClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationsClient: React.FC<ReservationClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);

        toast.success('Guest reservation canceled');
        router.refresh();
      } catch (error: any) {
        console.log(error);
        toast.error('Something went wrong');
      } finally {
        setDeletingId('');
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subTitle="Bookings in your properties" center />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
