'use client';

import React, { useEffect } from 'react';

import Hero from '@/components/Hero';
import { heroapi, footerAPI, highlightAPI, sneakerAPI, popularSales } from '@/data/data';
import Footer from '@/components/Footer';
import Highlight from '@/components/Highlight';
import Sales from '@/components/Sales';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { getProducts } from '@/redux/slices/products';
import Header from '@/components/Header';
import TopSales from '@/components/TopSales';
import Cart from '@/components/Cart';

function Home() {
  const dispatch = useAppDispatch();
  const { products, userInfo } = useAppSelector((state) => state.products);

  const userName = userInfo?.name;

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);

  return (
    <div>
      <Header userName={userName} />
      <Cart />
      <main className="flex flex-col gap-16 relative">
        <Hero heroapi={heroapi} />
        <Sales popularSales={popularSales} ifExists />
        <Highlight highlightAPI={highlightAPI} ifExists />
        <TopSales shoeproducts={products?.products} />
        <Highlight highlightAPI={sneakerAPI} />
      </main>
      <Footer footerAPI={footerAPI} />
    </div>
  );
}

export default Home;
