'use client';

import { useCallback, useMemo, useState } from 'react';
import { RENT_STEPS } from '@/constants/rent-modal-steps';
import { CATEGORIES } from '@/constants/categories';
import useRentModal from '@/app/hooks/useRentModal';

import Modal from './index';
import Heading from '../UI/Heading';
import CategoryInput from '../UI/Input/CategoryInput';

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(RENT_STEPS.CATEGORY);

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
        {CATEGORIES.map((category) => (
          <div key={category.id} className="col-span-1">
            <CategoryInput
              selected={false}
              label={category.label}
              icon={category.icon}
              onClick={() => {
                /*  */
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      title="Staycify your home"
      actionLabel={actionLabel}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={rentModal.onClose} // will change later
      secondaryAction={step === RENT_STEPS.CATEGORY ? undefined : onPrev}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default RentModal;
