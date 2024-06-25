'use client';

import { useAppDispatch } from '@/hooks/redux';
import { useCallback, useEffect } from 'react';
import { authRefreshToken, setIsAdmin, setIsLogged } from '@/redux/slices/auth';
import axios from 'axios';
import { toast } from 'sonner';
import { setCart, setUserInfo } from '@/redux/slices/products';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  // Used direct axios method as token kept in cokkie was not easy to pass in the intecptors
  // We can use session storage instead of cookie for easy accessibility
  // Session tokens is used widely now

  const refreshTokenAndFetchUser = useCallback(async () => {
    try {
      const res = await dispatch(authRefreshToken({}));
      if (res?.payload?.accesstoken) {
        const resToken = res.payload.accesstoken;

        const userRes = await axios.get('https://server-snapbuy.onrender.com/user/infor', {
          headers: { Authorization: resToken },
        });

        if (userRes?.data) {
          dispatch(setUserInfo(userRes?.data));
          dispatch(setCart(userRes?.data?.cart));
        }

        dispatch(setIsLogged(true));
        // Check user role and dispatch setIsAdmin action
        if (userRes?.data?.role === 1) {
          dispatch(setIsAdmin(true));
        } else {
          dispatch(setIsAdmin(false));
        }
      }
    } catch (err) {
      toast.error('Token Refresh Failed');
    }
  }, [dispatch]);

  useEffect(() => {
    const login = localStorage.getItem('Login');
    if (login) {
      refreshTokenAndFetchUser();
    }
  }, [dispatch, refreshTokenAndFetchUser]);

  return <div>{children}</div>;
}
