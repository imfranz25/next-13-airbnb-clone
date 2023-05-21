'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Container from '../components/UI/Container';
import Heading from '../components/UI/Heading';

import { SafeReservation, SafeUser } from '../types';
import ListingCard from '../components/Listings/ListingCard';

interface TripsClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);
        toast.success('Reservation Canceled');
        router.refresh();
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      } finally {
        setDeletingId('');
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Trips" subTitle="Where you've been and where you're going?" center />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations?.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
