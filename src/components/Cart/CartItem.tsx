'use client';

/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import './cartitem.css';
import axios from 'axios';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setCart, setUserInfo } from '@/redux/slices/products';

function CartItem({ item }: any) {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  const {
    description,
    gradientFrom,
    gradientTo,
    images,
    price,
    // product_id,
    quantity,
    shadowColor,
    title,
    _id,
  } = item;

  const handleRemoveItem = async (id: any) => {
    try {
      const res = await axios.delete(`http://localhost:5000/user/remove-from-cart/${id}`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      toast.success('Item Removed');
      dispatch(setCart(res?.data?.user?.cart));
      dispatch(setUserInfo(res?.data?.user));
    } catch {
      toast.error('Item Remove Failed');
    }
  };

  const handleIncreaseItemQTY = async (id: any) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/increase-quantity/${id}`, null, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      toast.success('Item Quantity Increased');
      dispatch(setCart(res?.data?.user?.cart));
      dispatch(setUserInfo(res?.data?.user));
    } catch {
      toast.error('Item Quatity Increase Failed');
    }
  };

  const handleDecreaseItemQTY = async (id: any) => {
    try {
      const res = await axios.put(`http://localhost:5000/user/decrease-quantity/${id}`, null, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      toast.success('Item Quantity Decreased');
      dispatch(setCart(res?.data?.user?.cart));
      dispatch(setUserInfo(res?.data?.user));
    } catch {
      toast.error('Item Quantity Decrease Failed');
    }
  };

  // css style from dynamic

  const cardBgStyle = {
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    boxShadow: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`,
  };

  return (
    <div className="flex items-center justify-between w-full px-5 bg-slate-100 py-2">
      <div className="flex items-center gap-5">
        <div
          className="relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center"
          style={cardBgStyle}
        >
          <Image
            width={500}
            height={500}
            src={images.url}
            alt={`img/cart-item/${_id}`}
            className="w-36 h-auto object-fill lg:w-28"
          />
          <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
            ${price}
          </div>
        </div>
        <div className="grid items-center gap-4">
          <div className="grid items-center leading-none">
            <h1 className="font-medium text-base text-slate-800 lg:text-sm">{title} </h1>
            <p className="text-sm text-slate-800 lg:text-xs">{description}</p>
          </div>
          <div className="flex items-center gap-6  w-full">
            <button
              type="button"
              aria-label="decrease"
              onClick={() => handleDecreaseItemQTY(_id)}
              className="bg-theme-cart rounded w-5 h-5 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90 transition-all duration-200 ease-in-out hover:scale-105"
            >
              <MinusIcon className="w-3 h-3 lg:w-3 lg:h-3 text-white stroke-[2] " />
            </button>
            <div className="bg-theme-cart rounded text-white font-normal text-[14px] w-5 h-5 lg:w-5 lg:h-5 flex items-center justify-center">
              {quantity}
            </div>
            <button
              type="button"
              aria-label="increase"
              onClick={() => handleIncreaseItemQTY(_id)}
              className="bg-theme-cart rounded w-5 h-5 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90 transition-all duration-200 ease-in-out hover:scale-105"
            >
              <PlusIcon className="w-3 h-3 lg:w-3 lg:h-3 text-white stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid items-center gap-5">
        <div className="grid items-center justify-center">
          <h1 className="text-base  font-medium text-blue-700">${price * quantity}</h1>
        </div>
        <div className="grid items-center justify-center mt-3 ">
          <button
            type="button"
            aria-label="remove"
            className="bg-theme-cart rounded w-6 h-6 lg:w-6 lg:h-6 flex items-center justify-center active:scale-90 transition-all duration-200 ease-in-out hover:scale-105"
            onClick={() => handleRemoveItem(_id)}
          >
            <TrashIcon className="w-4 h-4 lg:w-4 lg:h-4 text-white stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
