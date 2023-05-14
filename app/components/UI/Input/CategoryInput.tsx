'use client';

import { IconType } from 'react-icons';

interface CategoryInput {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInput> = ({ icon: Icon, selected, label, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex 
        flex-col 
        gap-3 
        p-4 
        border-2 
        rounded-xl 
        hover:border-black
        transition
        cursor-pointer
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
