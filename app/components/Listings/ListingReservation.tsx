'use client';

import React from 'react';

import { Range } from 'react-date-range';
import Calendar from '../UI/Input/Calendar';

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  disabled?: boolean;
  disabledDates: Date[];
  dateRange: Range;
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold mr-[2px]">$ {price}</div>
        <div className="font-light text-neutral-600">Night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
    </div>
  );
};

export default ListingReservation;
