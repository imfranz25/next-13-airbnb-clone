'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import CategoryBox from '../CategoryBox';
import Container from '../UI/Container';
import { CATEGORIES } from '@/constants/catergories';

const Categories = () => {
  const params = useSearchParams();
  const pathName = usePathname();
  const categoryQuery = params?.get('category');

  const isMainPage = pathName === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div className="flex flex-row items-center justify-between pt-4 overflow-x-auto ">
        {CATEGORIES.map((category) => (
          <CategoryBox
            key={category.id}
            label={category.label}
            icon={category.icon}
            selected={categoryQuery === category.label}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
