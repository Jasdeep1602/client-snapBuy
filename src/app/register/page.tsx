'use client';

import CustomButton from '@/components/CustomButton';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
/* eslint-disable react/no-unescaped-entities */
import { authRegister } from '@/redux/slices/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

function Register() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { isRegFetching } = useAppSelector((state) => state.auth);
  // local state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();

    await dispatch(
      authRegister({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Register Success');
        router.push('/login');
      })
      .catch((err) => {
        if (err) {
          toast.error('Registration Failed');
        }
      });
  };
  return (
    <form onSubmit={handleRegister}>
      <div className="flex h-screen w-screen items-center overflow-hidden px-2 justify-center `">
        <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
          <div
            className="-z-10 absolute top-4 left-2/3 h-full w-5/6 -translate-x-1/2 rounded-lg bg-gradient-to-b from-blue-600 to-blue-500
      shadow-lg shadow-blue-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"
          />
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold  text-blue-500">Register</h1>
            <p className="text-gray-500">Register to create your account</p>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={handleInput}
              />
              <label
                htmlFor="name"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {' '}
                Enter Your Username{' '}
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="text"
                id="email"
                name="email"
                value={user.email}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={handleInput}
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {' '}
                Enter Your Email{' '}
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
                onChange={handleInput}
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {' '}
                Enter Your Password
              </label>
            </div>
          </div>
          <div className="flex w-full items-center">
            <CustomButton
              typeButton="submit"
              className="flex items-center justify-center shrink-0 w-36 rounded-lg bg-blue-600 hover:bg-blue-700  py-3 font-bold text-white"
              loadingState={isRegFetching}
              text="Register"
            />
          </div>
          <p className="text-center text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="whitespace-nowrap font-semibold text-blue-500 hover:underline "
            >
              {' '}
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
}

export default Register;
