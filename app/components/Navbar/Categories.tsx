'use client';

import CategoryBox from '../CategoryBox';
import Container from '../UI/Container';
import { CATEGORIES } from '@/constants/catergories';

const Categories = () => {
  return (
    <Container>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {CATEGORIES.map((category) => (
          <CategoryBox
            key={category.id}
            label={category.label}
            icon={category.icon}
            description={category.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
