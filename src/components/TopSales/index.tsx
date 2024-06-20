'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { ProductProps } from './interface';
import ShoeCard from './ShoeCard';

function TopSales({ products }: ProductProps) {
  console.log(products, 'sdvbsb');
  const { isLogged } = useAppSelector((state) => state.auth);

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

      <div className="grid items-center justify-items-center  gap-7 lg:gap-5 mt-7 grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 ">
        {products?.map((item: any) => <ShoeCard {...item} key={item?.product_id} />)}
      </div>
    </div>
  );
}

export default TopSales;
