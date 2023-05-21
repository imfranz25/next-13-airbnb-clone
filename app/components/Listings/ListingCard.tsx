'use client';

import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { SafeUser, SafeListing, SafeReservation } from '@/app/types';
import { useRouter } from 'next/navigation';
import useCountries from '@/app/hooks/useCountries';

import HeartButton from '../HeartButton';
import Image from 'next/image';
import Button from '../UI/Button';

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  currentUser,
  actionId = '',
}) => {
  const router = useRouter();
  const { getValue } = useCountries();

  const location = getValue(data.locationValue);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  const handleCancel = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full ga-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            fill
            alt={data.title}
            src={data.imageSrc}
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="text-lg font-semibold">
          {location?.region} {location?.label}
        </div>
        <div className="font-light text-neutral-500">{reservationDate || data.category}</div>
        <div className="flex flex-row items-center gap-1 py-1">
          <div className="font-semibold ">$ {price}</div>
          {!reservation && <div className="font-light">Night</div>}
        </div>
        {onAction && actionLabel && (
          <Button small disabled={disabled} label={actionLabel} onClick={handleCancel} />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
