/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';

function Login() {
  return (
    <div>
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
                value="email@gmail.com"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
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
                type="text"
                id="password"
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                placeholder=" "
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
            <button
              type="button"
              className="shrink-0 inline-block w-36 rounded-lg bg-violet-500 py-3 font-bold text-white"
            >
              Login
            </button>
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
    </div>
  );
}

export default Login;
