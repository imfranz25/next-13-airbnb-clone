'use client';

import { useRouter } from 'next/navigation';

import Heading from './UI/Heading';
import Button from './UI/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  showReset,
  title = 'No exact matches',
  subtitle = 'Try changing or removing your filters',
}) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center />
      {showReset && (
        <div className="w-48 mt-4">
          <Button outline label="Remove all filters" onClick={() => router.push('/')} />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
