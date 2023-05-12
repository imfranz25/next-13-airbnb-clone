'use client';

import axios from 'axios';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './index';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        await axios.post('/api/register', data);
        registerModal.onClose();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      ``;
    },
    [registerModal]
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
