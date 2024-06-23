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
  const { isFetching, products } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);
  console.log(isFetching, products?.products, 'go');

  return (
    <div>
      <Header />
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
