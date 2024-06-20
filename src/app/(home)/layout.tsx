'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useEffect } from 'react';
import { authRefreshToken, setIsAdmin, setIsLogged } from '@/redux/slices/auth';
import axios from 'axios';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  console.log(token, 'here isit');

  // Used direct axios method as token kept in cokkie was not easy to pass in the intecptors
  // We can use session storage instead of cookie for easy accessibility
  // Session tokens is used widely now

  const refreshTokenAndFetchUser = useCallback(async () => {
    try {
      const res = await dispatch(authRefreshToken({}));
      console.log(res, 'Token refreshed');
      if (res?.payload?.accesstoken) {
        const resToken = res.payload.accesstoken;

        const userRes = await axios.get('http://localhost:5000/user/infor', {
          headers: { Authorization: resToken },
        });
        console.log(userRes, 'User info');
        dispatch(setIsLogged(true));
        // Check user role and dispatch setIsAdmin action
        if (userRes?.data?.role === 1) {
          dispatch(setIsAdmin(true));
        } else {
          dispatch(setIsAdmin(false));
        }
      }
    } catch (err) {
      console.error('Error refreshing token or fetching user info', err);
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
