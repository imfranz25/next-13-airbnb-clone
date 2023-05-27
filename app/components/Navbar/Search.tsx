'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { BiSearch } from 'react-icons/bi';

import useSearchModal from '@/app/hooks/useSearchModal';
import useCountries from '@/app/hooks/useCountries';
import { differenceInDays } from 'date-fns';

const Search = () => {
  const { getValue } = useCountries();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  const locationValue = searchParams?.get('locationValue');
  const endDate = searchParams?.get('endDate');
  const startDate = searchParams?.get('startDate');
  const guestCount = searchParams?.get('guestCount');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getValue(locationValue as string)?.label;
    }

    return 'Anywhere';
  }, [locationValue, getValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} day(s)`;
    }

    return 'Any Week';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guest(s)`;
    }

    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div className="flex flex-row items-center justify-between ">
        <div className="px-6 text-sm font-semibold ">{locationLabel}</div>
        <div
          className="
            hidden
            sm:block
            text-sm
            font-semibold
            px-6
            border-x-[1px]
            flex-1
            flex-center
          "
        >
          {durationLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600 ">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 text-white rounded-full bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
