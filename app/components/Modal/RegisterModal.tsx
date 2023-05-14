'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { signIn } from 'next-auth/react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';

import Modal from './index';
import Heading from '../UI/Heading';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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

  const openLoginModal = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

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
    },
    [registerModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Staycify" subTitle="Create an account" center />
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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        label="Continue with Google"
        onClick={() => signIn('google')}
      />
      <Button
        outline
        icon={AiFillGithub}
        label="Continue with Github"
        onClick={() => signIn('github')}
      />
      <div
        className="mt-4 font-light text-center  text-neutral-500"
      >
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Already have an account?</div>
          <div className="cursor-pointer text-neutral-500 hover:underline" onClick={openLoginModal}>
            Log in
          </div>
        </div>
      </div>
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
      footer={footerContent}
    />
  );
};

export default RegisterModal;
