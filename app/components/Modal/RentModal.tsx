'use client';

import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { RENT_STEPS } from '@/constants/rent-modal-steps';
import { CATEGORIES } from '@/constants/categories';
import useRentModal from '@/app/hooks/useRentModal';

import Modal from './index';
import Heading from '../UI/Heading';
import CategoryInput from '../UI/Input/CategoryInput';
import CountrySelect from '../UI/Input/CountrySelect';
import Counter from '../UI/Input/Counter';
import ImageUpload from '../UI/Input/ImageUpload';
import Input from '../UI/Input';

const RentModal = () => {
  const router = useRouter();
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
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== RENT_STEPS.PRICE) {
      return onNext();
    }

    setLoading(true);
    console.log(data);

    try {
      const response = await axios.post('/api/listings', data);

      toast.success('Log in success');
      router.refresh();
      rentModal.onClose();

      reset();
      setStep(RENT_STEPS.CATEGORY);
    } catch (error) {
      toast.error('Please specify all the information needed');
    } finally {
      setLoading(false);
    }
  };

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
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basic info abut your place!"
          subTitle="What amenities do you have?"
          center
        />
        <Counter
          title="Guest"
          subtitle="How many guest do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue('guestCount', value)}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue('roomCount', value)}
        />

        <hr />
        <Counter
          title="Bathroom"
          subtitle="How many guest do you allow?"
          value={bathroomCount}
          onChange={(value) => setCustomValue('bathroomCount', value)}
        />
      </div>
    );
  }

  if (step === RENT_STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subTitle="Show your guest what your place looks like!"
          center
        />
        <ImageUpload value={imageSrc} onChange={(value) => setCustomValue('imageSrc', value)} />
      </div>
    );
  }

  if (step === RENT_STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subTitle="Show and sweet works best!"
          center
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === RENT_STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="Now, set your price" subTitle="How much doo you charge per night?" center />
        <Input
          id="price"
          label="Price"
          disabled={isLoading}
          register={register}
          errors={errors}
          type="number"
          required
          formatPrice
        />
      </div>
    );
  }

  return (
    <Modal
      title="Staycify your home"
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryAction={step === RENT_STEPS.CATEGORY ? undefined : onPrev}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
      disabled={isLoading}
    />
  );
};

export default RentModal;
