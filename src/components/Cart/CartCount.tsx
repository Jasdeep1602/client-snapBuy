'use client';

import React from 'react';
import { ChevronDoubleLeftIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAppDispatch } from '@/hooks/redux';
import { setCartToggle, setClearCart } from '@/redux/slices/products';

function CartCount() {
  const dispatch = useAppDispatch();

  const handleCartClose = () => {
    dispatch(setCartToggle(false));
  };

  const handleCartClear = () => {
    dispatch(setClearCart());
  };

  return (
    <div className="bg-white h-11 flex items-center justify-between px-3 sticky top-0 left-0 right-0 w-full">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="cart"
          className="grid items-center cursor-pointer "
          onClick={handleCartClose}
        >
          <ChevronDoubleLeftIcon className="w-5 h-5 text-slate-900 hover:text-orange-500 stroke-[2] " />
        </button>
        <div className="grid item-center">
          <h1 className="text-base font-medium text-slate-900">
            Your Cart
            <span className="bg-theme-cart rounded  ml-1 px-1 py-0.5 text-slate-100 font-normal text-xs">
              ( Items)
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          aria-label="clear"
          onClick={handleCartClear}
          className="rounded bg-theme-cart active:scale-90 p-0.5"
        >
          <XMarkIcon className="w-5 h-5 text-white stroke-[2]" />
        </button>
      </div>
    </div>
  );
}

export default CartCount;
