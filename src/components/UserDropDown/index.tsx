'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authLogout, setIsAdmin, setIsLogged } from '@/redux/slices/auth';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function UserDropdown() {
  // uer dropdown
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLogged } = useAppSelector((state) => state.auth);
  const { userInfo } = useAppSelector((state) => state.products);
  const [isOpen, setIsOpen] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (!isLogged) {
      router.push('/login');
    } else {
      setIsLoading(true);
      await dispatch(authLogout({}))
        .unwrap()
        .then(() => {
          localStorage.clear();
          dispatch(setIsAdmin(false));
          dispatch(setIsLogged(false));
          setIsLoading(true);

          toast.success('Logged out Successfully');
          router.push('/login');
        })
        .catch((err) => {
          if (err) {
            toast.error('Logout Failed');
          }
        });
    }
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        aria-label="user"
        className={`overflow-hidden flex-shrink-0 object-cover mx-1 ${!isLogged ? 'bg-gray-500' : ' bg-orange-700'} ${isLogged && 'text-white'} justify-center rounded-full relative z-10 flex items-center border border-spacing-2 border-transparent active:border-green-500 hover:border-green-500 active:ring-opacity-40 active:ring-green-300 active:outline-none w-10 h-10`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isLogged && userInfo ? (
          userInfo?.name.charAt(0).toUpperCase()
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6 p-1 text-white stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl">
          {isLogged && userInfo && (
            <>
              <button
                type="button"
                className=" w-full flex items-center p-3 -mt-2 text-sm text-slate-800 transition-colors duration-300 transform hover:bg-gray-100"
              >
                <div className=" flex flex-col mx-1 justify-center items-start">
                  <h1 className="text-sm font-semibold text-blue-800">{userInfo?.name}</h1>
                  <p className="text-sm text-blue-500 ">{userInfo?.email}</p>
                </div>
              </button>
              <hr className="border-gray-200" />{' '}
            </>
          )}

          <button
            type="button"
            className="w-full flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
            onClick={handleRegister}
          >
            <svg
              className="w-5 h-5 mx-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM19 16H17V13H14V11H17V8H19V11H22V13H19V16ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
                fill="currentColor"
              />
            </svg>

            <span className="mx-1">Register new user?</span>
          </button>

          <hr className="border-gray-200" />

          <button
            type="button"
            className="w-full flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
            onClick={handleLogout}
          >
            <svg
              className="w-5 h-5 mx-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                fill="currentColor"
              />
            </svg>

            <span className="mx-1">{isLogged ? 'Log Out' : 'Log In'}</span>

            {isloading ? (
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2 animate-spin"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z" />
              </svg>
            ) : (
              ''
            )}
          </button>
        </div>
      )}
    </div>
  );
}
