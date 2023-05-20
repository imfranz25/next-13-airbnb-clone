'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { SafeListing, SafeUser, SafeReservation } from '@/app/types';

import Container from '@/app/components/UI/Container';
import ListingHead from '@/app/components/Listings/ListingHead';
import ListingInfo from '@/app/components/Listings/ListingInfo';
import ListingReservation from '@/app/components/Listings/ListingReservation';
import useLoginModal from '@/app/hooks/useLoginModal';
import { CATEGORIES } from '../../../constants/categories';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
  reservations?: SafeReservation[];
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setLoading(true);

    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      });

      toast.success('Listing reserved!');
      router.refresh();
      setDateRange(initialDateRange);

      // TODO: REDIRECT
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [
    currentUser,
    loginModal,
    totalPrice,
    dateRange.startDate,
    dateRange.endDate,
    listing.id,
    router,
  ]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const daysCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

      if (daysCount && listing.price) {
        setTotalPrice(daysCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto my-10">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 my-6 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
