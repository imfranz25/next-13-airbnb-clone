import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { use, useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

import { SafeUser } from '../types';

import useLoginModal from './useLoginModal';

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(
    async (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let toggleMessage;

        if (hasFavorited) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          toggleMessage = 'Removed from favorites';
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          toggleMessage = 'Added to favorites';
        }

        await request();
        router.refresh();
        toast.success(toggleMessage);
      } catch (error) {
        toast.success('Something went wrong');
      }
    },
    [currentUser, loginModal, router, listingId, hasFavorited]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
