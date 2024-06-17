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
import { authRefreshToken } from '@/redux/slices/auth';
// import axios from 'axios';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isFetching, products } = useAppSelector((state) => state.products);

  //   const token = await axios.get('http://localhost:5000/user/refreshtoken', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     withCredentials: true,
  //   });
  //   console.log('refresh', token);
  // } catch (err: any) {
  //   console.log(err.response.data.msg);
  // }

  const refreshToken = useCallback(async () => {
    await dispatch(authRefreshToken({})).then((res) => {
      console.log(res, 'don it');
    });
  }, [dispatch]);
  useEffect(() => {
    const login = localStorage.getItem('Login');
    if (login) refreshToken();
    dispatch(getProducts({}));
  }, [dispatch, refreshToken]);

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
