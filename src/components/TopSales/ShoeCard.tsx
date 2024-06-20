'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBagIcon, StarIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/16/solid';

import { useAppSelector } from '@/hooks/redux';
import { CardProps } from './interface';
import './card.css';

export default function ShoeCard({
  product_id,
  title,
  price,
  description,
  images,
  gradientFrom,
  gradientTo,
  shadowColor,
  rating,
}: CardProps) {
  const { isAdmin, isLogged } = useAppSelector((state) => state.auth);
  // css style from dynamic

  const cardBgStyle = {
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    boxShadow: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`,
  };

  return (
    <div className="card justify-center" style={cardBgStyle}>
      <div className="grid items-center justify-items-center ">
        <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
          {' '}
          {title}
        </h1>
        <p className="text-slate-200 filter text-base md:text-sm font-normal">{description}</p>
        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex items-center bg-white/80 px-1 rounded blur-effect-theme">
            <h1 className="text-black text-sm font-medium">${price}</h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-slate-100">{rating}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isLogged && !isAdmin && (
            <button
              type="button"
              aria-label="shopping"
              className="bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200"
            >
              <ShoppingBagIcon className="icon-style text-slate-900" />
            </button>
          )}
          {isAdmin && (
            <>
              <button
                type="button"
                aria-label="shopping"
                className="bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200"
              >
                <TrashIcon className="icon-style text-slate-900" />
              </button>
              <button
                type="button"
                aria-label="shopping"
                className="bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200"
              >
                <PencilSquareIcon className="icon-style text-slate-900" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center justify-items-center">
        <Image
          src={images?.url}
          width={500} // Adjust the width value in pixels
          height={500} // Height value will be auto
          alt={`img/item-img/${product_id}`}
          className="transitions-theme hover:-rotate-12 h-36 w-64"
        />
      </div>
    </div>
  );
}
