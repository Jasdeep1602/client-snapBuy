'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { heroapi, footerAPI, highlightAPI, sneakerAPI, popularSales } from '@/data/data';
import Footer from '@/components/Footer';
import Highlight from '@/components/Highlight';
import Sales from '@/components/Sales';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useCallback, useEffect } from 'react';
import { getProducts } from '@/redux/slices/products';
import { authRefreshToken, setIsAdmin, setIsLogged } from '@/redux/slices/auth';
import axios from 'axios';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isFetching, products } = useAppSelector((state) => state.products);
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
      dispatch(getProducts({}));
    }
  }, [dispatch, refreshTokenAndFetchUser]);

  console.log(isFetching, products, 'health');
  return (
    <div>
      {' '}
      <Header />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales popularSales={popularSales} ifExists />
        <Highlight highlightAPI={highlightAPI} ifExists />
        <Highlight highlightAPI={sneakerAPI} />
      </main>
      <Footer footerAPI={footerAPI} />
    </div>
  );
}
