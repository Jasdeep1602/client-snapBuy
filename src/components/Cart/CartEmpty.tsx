'use client';

import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAppDispatch } from '@/hooks/redux';
import { setCartToggle } from '@/redux/slices/products';

function CartEmpty() {
  const dispatch = useAppDispatch();

  const handleCartClose = () => {
    dispatch(setCartToggle(false));
  };

  return (
    <div className="flex items-center justify-center flex-col h-screen px-11 text-center gap-7">
      <Image
        src="/emptybag.png"
        width={500}
        height={500}
        alt="emptybag/img"
        className="w-40 lg:w-36 sm:w-28 h-auto object-fill transition-all duration-300 hover:scale-110"
      />
      <button
        type="button"
        className="button-theme bg-gradient-to-b from-amber-500 to-orange-500 shadow-lg shadow-orange-500 flex items-center justify-center text-slate-900 py-2 gap-3 text-sm px-5 font-semibold active:scale-110"
        onClick={handleCartClose}
      >
        <ArrowLeftIcon className="w-5 h-5 text-slate-900" />
        <span className="">Back To Nike Store</span>
      </button>
    </div>
  );
}

export default CartEmpty;
