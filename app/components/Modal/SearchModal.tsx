'use client';

import useSearchModal from '@/app/hooks/useSearchModal';
import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { SEARCH_STEPS } from '@/constants/search-modal-steps';
import { Range } from 'react-date-range';

import Modal from '.';
import dynamic from 'next/dynamic';
import { CountrySelectValue } from '../UI/Input/CountrySelect';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

const SearchModal = () => {
  const params = useParams();
  const router = useRouter();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(SEARCH_STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [location, setLocation] = useState<CountrySelectValue>();

  const Map = useMemo(
    () =>
      dynamic(import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onSubmitSearch = useCallback(() => {}, []);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmitSearch}
      title="Filters"
      actionLabel="Search"
    />
  );
};

export default SearchModal;
