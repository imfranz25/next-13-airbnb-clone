'use client';

import axios from 'axios';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import Container from '../components/UI/Container';
import Heading from '../components/UI/Heading';

import { SafeListing, SafeUser } from '../types';
import ListingCard from '../components/Listings/ListingCard';

interface TripsClientProps {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<TripsClientProps> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/listings/${id}`);
        toast.success('Listing deleted');
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
      <Heading title="Properties" subTitle="List of your properties" center />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete listing"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
