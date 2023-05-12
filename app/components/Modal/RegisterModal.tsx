'use client';

import axios from 'axios';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './index';
import Heading from '../UI/Heading';
import Input from '../UI/Input';
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
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
      ``;
    },
    [registerModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Stacify" subTitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Register"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
