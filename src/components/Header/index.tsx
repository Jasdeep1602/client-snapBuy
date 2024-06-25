'use client';

import React, { useEffect, useState } from 'react';

import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { authLogout, setIsAdmin, setIsLogged } from '@/redux/slices/auth';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { selectTotalQuantity, setCartToggle } from '@/redux/slices/products';
import CustomButton from '../CustomButton';

function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const totalQuantity = useAppSelector(selectTotalQuantity);

  const { isLogged } = useAppSelector((state) => state.auth);
  const { userInfo } = useAppSelector((state) => state.products);

  const [navState, setNavState] = useState(false);

  const onNavScroll = () => {
    if (window.scrollY > 30) {
      setNavState(true);
    } else {
      setNavState(false);
    }
  };

  const handleCartOpen = () => {
    dispatch(setCartToggle(true));
  };

  const handleLogout = async () => {
    if (!isLogged) {
      router.push('/login');
    } else {
      await dispatch(authLogout({}))
        .unwrap()
        .then(() => {
          localStorage.clear();
          dispatch(setIsAdmin(false));
          dispatch(setIsLogged(false));
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

  useEffect(() => {
    window.addEventListener('scroll', onNavScroll);
    return () => {
      window.removeEventListener('scroll', onNavScroll);
    };
  }, []);
  return (
    <header
      className={
        !navState
          ? 'absolute top-7 right-0 left-0 opacity-100 z-50'
          : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'
      }
    >
      <nav className="flex items-center justify-between nike-container">
        <div className="flex items-center gap-4">
          <Image
            src="/shoelogo1.png"
            width={500} // Adjust the width value in pixels
            height={500} // Height value will be auto
            alt="logo/img"
            className={`w-44 h-auto ${navState && 'filter brightness-0'}`}
          />
        </div>

        {isLogged && userInfo?.name ? (
          <div className="grid items-center mt-5">
            <p className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-sm font-black">
              Hi, {userInfo?.name}
            </p>
          </div>
        ) : (
          <div className="grid items-center mt-5">
            <p className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-sm font-black">
              Hi, Guest
            </p>
          </div>
        )}

        <ul className="flex items-center justify-center gap-2">
          {/* <li className="grid items-center">
            <MagnifyingGlassIcon
              className={`icon-style ${navState && 'text-slate-900 transition-all duration-300'}`}
            />
          </li> */}
          {/* <li className="grid items-center">
            <HeartIcon
              className={`icon-style ${navState && 'text-slate-900 transition-all duration-300'}`}
            />
          </li> */}
          {isLogged && (
            <li className="grid items-center">
              <button
                type="button"
                className="border-none outline-none active:scale-110 transition-all duration-300 relative"
                onClick={handleCartOpen}
              >
                <ShoppingBagIcon
                  className={`icon-style ${navState && 'text-slate-900 transition-all duration-300'}`}
                />
                <div
                  className={`absolute top-4 right-0  shadow w-4 h-4 text-[0.65rem]  loading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${
                    navState
                      ? 'bg-slate-900 text-slate-100 shadow-slate-900'
                      : 'bg-slate-100 text-slate-900 shadow-slate-100'
                  }`}
                >
                  {totalQuantity}
                </div>
              </button>
            </li>
          )}
          <li className="grid items-center">
            <CustomButton
              typeButton="button"
              text={isLogged ? 'Log out' : 'Log in'}
              className={`transition-all duration-200 ease-in-out hover:scale-105  ml-6 mr-2 pr-2 pl-2 text-sm font-semibold leading-6 text-white ${isLogged ? 'bg-rose-700 hover:bg-rose-600' : 'bg-emerald-700 hover:bg-emerald-600 '} p-1 rounded  `}
              onClick={handleLogout}
            />
          </li>
          <li className="grid items-center">
            <Link
              href="/register"
              className=" transition-all duration-200 ease-in-out hover:scale-105 text-sm font-semibold pr-2 pl-2 leading-6 text-white bg-green-600 p-1 rounded "
            >
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
