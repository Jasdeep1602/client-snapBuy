'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import { heroapi, footerAPI, highlightAPI, sneakerAPI, popularSales } from '@/data/data';
import Footer from '@/components/Footer';
import Highlight from '@/components/Highlight';
import Sales from '@/components/Sales';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useEffect } from 'react';
import { getProducts } from '@/redux/slices/products';

export default function Home() {
  const dispatch = useAppDispatch();
  const { isLoading, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  console.log(isLoading, products, 'health');
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
