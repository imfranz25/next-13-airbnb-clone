'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';

import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import { AiOutlineMenu } from 'react-icons/ai';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const rentModal = useRentModal();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const handleOpenLoginModal = () => {
    loginModal.onOpen();
    setOpen(false);
  };

  const handleOpenRegisterModal = () => {
    registerModal.onOpen();
    setOpen(false);
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    // Open rent modal
    rentModal.onOpen();
  }, [loginModal, currentUser, rentModal]);

  const openNewPage = (route: string) => {
    router.push(route);
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden px-4 py-3 text-sm font-semibold transition rounded-full cursor-pointer md:block hover:bg-neutral-100"
        >
          Staycify your home
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:p-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
            z-10
        "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => openNewPage('/trips')} label="My trips" />
                <MenuItem onClick={() => openNewPage('/favorites')} label="My favorites" />
                <MenuItem onClick={() => openNewPage('/reservations')} label="My reservations" />
                <MenuItem onClick={() => openNewPage('/properties')} label="My properties" />
                <MenuItem onClick={rentModal.onOpen} label="Staycify your home" />
                <hr />
                <MenuItem onClick={signOut} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={handleOpenLoginModal} label="Login" />
                <MenuItem onClick={handleOpenRegisterModal} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
