'use client';

import toast from 'react-hot-toast';
import { useCallback, useMemo, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { RENT_STEPS } from '@/constants/rent-modal-steps';
import { CATEGORIES } from '@/constants/categories';
import useRentModal from '@/app/hooks/useRentModal';

import Modal from './index';
import Heading from '../UI/Heading';
import CategoryInput from '../UI/Input/CategoryInput';
import CountrySelect from '../UI/Input/CountrySelect';
import dynamic from 'next/dynamic';
const RentModal = () => {
  const [isLoading, setLoading] = useState(false);
  const rentModal = useRentModal();
  const [step, setStep] = useState(RENT_STEPS.CATEGORY);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      title: '',
      imageSrc: '',
      description: '',
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
      price: 1,
      location: null,
    },
  });

  const category = watch('category');
  const location = watch('location');
  const Map = useMemo(
    () =>
      dynamic(() => import('../Map'), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onPrev = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === RENT_STEPS.PRICE) {
      return 'Create';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === RENT_STEPS.CATEGORY) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setLoading(true);
      console.log(data);

      try {
        const response = await fetch('submit rent');

        if (response?.ok) {
          toast.success('Log in success');
          rentModal.onClose();
        }

        // if (response?.error) {
        //   toast.error('Invalid email or password');
        // }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setLoading(false);
      }
    },
    [rentModal]
  );

  /* Rent Modal Contents */
  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="Which of these best describe your place?" subTitle="Pick a category" center />
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {CATEGORIES.map((item) => (
          <div key={item.id} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={(categoryLabel) => setCustomValue('category', categoryLabel)}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === RENT_STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Where is your place located?" subTitle="Help guests find you!" center />
        <CountrySelect
          value={location}
          onChange={(location) => setCustomValue('location', location)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === RENT_STEPS.INFO) {
    bodyContent = <div>Info Step</div>;
  }

  if (step === RENT_STEPS.IMAGES) {
    bodyContent = <div>Images Step</div>;
  }

  if (step === RENT_STEPS.DESCRIPTION) {
    bodyContent = <div>Description Step</div>;
  }

  if (step === RENT_STEPS.PRICE) {
    bodyContent = <div>Price Step</div>;
  }

  return (
    <Modal
      title="Staycify your home"
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={step === RENT_STEPS.PRICE ? handleSubmit(onSubmit) : onNext}
      secondaryAction={step === RENT_STEPS.CATEGORY ? undefined : onPrev}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;
