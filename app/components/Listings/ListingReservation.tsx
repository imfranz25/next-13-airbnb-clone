'use client';

import { Range } from 'react-date-range';

import Calendar from '../UI/Input/Calendar';
import Button from '../UI/Button';

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
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserved" onClick={onSubmit} />
      </div>
      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
