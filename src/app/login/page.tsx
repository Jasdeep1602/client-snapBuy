'use client';

/* eslint-disable react/no-unescaped-entities */
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import Link from 'next/link';
import React, { useState } from 'react';
import { authLogin } from '@/redux/slices/auth';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import CustomButton from '@/components/CustomButton';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { HomeIcon } from '@heroicons/react/24/solid';

function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleHomeRoute = () => {
    router.push('/');
  };

  const { isLoginFetching } = useAppSelector((state) => state.auth);
  // local state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [togglevisible, setToggleVisible] = useState(false);

  const handleVisible = () => {
    setToggleVisible(!togglevisible);
  };

  const handleInput = (e: any) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    // try {
    //   await axios.post('http://localhost:5000/user/login', user, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     withCredentials: true,
    //   });
    //   localStorage.setItem('Login', 'true');
    //   router.push('/');
    // } catch (err: any) {
    //   console.log(err.response.data.msg);
    // }

    await dispatch(
      authLogin({
        data: {
          email: user.email,
          password: user.password,
        },
      })
    )
      .unwrap()
      .then(() => {
        localStorage.setItem('Login', 'true');
        toast.success('Login Success');
        router.push('/');
      })
      .catch((err) => {
        if (err) {
          toast.error('Login Failed');
        }
      });
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <div className="flex h-screen w-screen items-center overflow-hidden px-2 justify-center `">
          <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
            <div
              className="-z-10 absolute top-4 left-2/3 h-full w-5/6 -translate-x-1/2 rounded-lg bg-gradient-to-b from-violet-500 to-indigo-500
      shadow-lg shadow-violet-500 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"
            />
            <div className="mx-auto mb-2 space-y-3">
              <h1 className="text-center text-3xl font-bold text-violet-500">Log in</h1>
              <p className="text-gray-500">Log in to access your account</p>
            </div>

            <div>
              <div className="relative mt-2 w-full">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={user?.email}
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
                  type={togglevisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={user?.password}
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
                <button
                  type="button"
                  aria-label="password"
                  className="absolute right-4 top-3 "
                  onClick={handleVisible}
                >
                  {togglevisible ? (
                    <EyeIcon className=" text-gray-400  w-5 h-5 md:w-4 md:h-4" />
                  ) : (
                    <EyeSlashIcon className=" text-gray-400  w-5 h-5 md:w-4 md:h-4" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex w-full items-center">
              <CustomButton
                typeButton="submit"
                className="flex items-center justify-center shrink-0  w-36 rounded-lg bg-violet-500 hover:bg-violet-600 py-3 font-bold text-white"
                loadingState={isLoginFetching}
                text="Login"
              />
            </div>
            <p className="text-center text-gray-600">
              Don't have an account?
              <Link
                href="/register"
                className="whitespace-nowrap font-semibold text-violet-500 hover:underline "
              >
                {' '}
                Register
              </Link>
            </p>
          </div>
        </div>
      </form>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          aria-label="Home"
          className="bg-violet-500 text-white p-2 rounded-full shadow-lg hover:bg-violet-600"
          onClick={handleHomeRoute}
        >
          <HomeIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}

export default Login;
