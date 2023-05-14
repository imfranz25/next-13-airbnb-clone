'use client';

import { signIn } from 'next-auth/react';
import { useState, useCallback } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';

import Modal from './index';
import Heading from '../UI/Heading';
import Input from '../UI/Input';
import Button from '../UI/Button';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const openRegisterModal = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      setIsLoading(true);

      try {
        const response = await signIn('credentials', {
          ...data,
          redirect: false,
        });

        if (response?.ok) {
          toast.success('Log in success');
          router.refresh();
          loginModal.onClose();
        }

        if (response?.error) {
          toast.error('Invalid email or password');
        }
      } catch (error) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [router, loginModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back!" subTitle="Log in to your account" center />
      <Input
        id="email"
        label="Email"
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
        disabled={isLoading}
        icon={FcGoogle}
        label="Login with Google"
        onClick={() => signIn('google')}
      />
      <Button
        outline
        disabled={isLoading}
        icon={AiFillGithub}
        label="Login with Github"
        onClick={() => signIn('github')}
      />
      <div className="mt-4 font-light text-center text-neutral-500">
        <div className="flex flex-row items-center justify-center gap-2">
          <div>Don&apos;t have an account?</div>
          <div
            className="cursor-pointer text-neutral-500 hover:underline"
            onClick={openRegisterModal}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Sign up"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
