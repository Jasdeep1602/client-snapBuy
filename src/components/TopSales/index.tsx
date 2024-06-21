'use client';

/* eslint-disable no-underscore-dangle */

import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { ProductProps } from './interface';
import ShoeCard from './ShoeCard';

function TopSales({ shoeproducts }: ProductProps) {
  console.log(shoeproducts, 'sdvbsb');
  const { isLogged } = useAppSelector((state) => state.auth);
  const { isFetching, products } = useAppSelector((state) => state.products);

  return (
    <div className="nike-container">
      <div className="grid items-center">
        <h1 className="text-5xl lg:text-4xl md:text-3xl font-bold text-slate-900 filter drop-shadow-lg ">
          Top Rated Sales
        </h1>
      </div>

      {!isLogged && (
        <div className="grid items-center mt-5">
          <p className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent text-sm font-black">
            IMP : Login to Buy and Add products to cart!!!
          </p>
        </div>
      )}

      {isFetching || products === null ? (
        <div className="flex gap-2 items-center justify-center min-h-80 min-w-full ">
          <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
          <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
          <div className="w-5 h-5 rounded-full animate-pulse-fast bg-blue-600" />
        </div>
      ) : (
        <div className="grid items-center justify-items-center  gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
          {shoeproducts?.map((item: any) => <ShoeCard {...item} key={item?._id} />)}
        </div>
      )}
    </div>
  );
}

export default TopSales;
