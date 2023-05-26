'use client';

import { useCallback, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Range } from 'react-date-range';
import { formatISO } from 'date-fns';
import dynamic from 'next/dynamic';
import queryString from 'query-string';
import useSearchModal from '@/app/hooks/useSearchModal';

import Modal from '.';
import Heading from '../UI/Heading';
import CountrySelect, { CountrySelectValue } from '../UI/Input/CountrySelect';
import Calendar from '../UI/Input/Calendar';
import Counter from '../UI/Input/Counter';
import { SEARCH_STEPS } from '@/constants/search-modal-steps';

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
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onSubmitSearch = useCallback(async () => {
    if (step !== SEARCH_STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const finalQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      finalQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      finalQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: finalQuery,
      },
      { skipNull: true }
    );

    setStep(SEARCH_STEPS.LOCATION);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    onNext,
    params,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    searchModal,
    router,
  ]);

  const actionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === SEARCH_STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading center title="Where do you wanna go?" subTitle="Find the perfect location" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === SEARCH_STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading center title="When do you plan to go?" subTitle="Make sure everyone is free" />
        <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
      </div>
    );
  }

  if (step === SEARCH_STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading center title="More information" subTitle="Find your perfect place" />
        <Counter
          title="Guest"
          subtitle="How many guest are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you prefer?"
          value={bathroomCount}
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmitSearch}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === SEARCH_STEPS.LOCATION ? undefined : onBack}
      title="Filters"
    />
  );
};

export default SearchModal;
``;
