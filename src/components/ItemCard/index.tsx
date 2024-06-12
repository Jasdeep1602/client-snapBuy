/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
  StarIcon,
  //  ShoppingBagIcon
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import { Items } from '../Sales/interface';
import './item.css';

function ItemCard({
  ifExists,
  id,
  titleinner,
  text,
  img,
  // btn,
  rating,
  price,
  gradientFrom,
  gradientTo,
  shadowColor,
}: Items) {
  // css style from dynamic

  const cardBgStyle = {
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    boxShadow: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`,
  };

  return (
    <div className={`card ${ifExists ? 'justify-start' : 'justify-center'}`} style={cardBgStyle}>
      <div
        className={`grid items-center ${
          ifExists ? 'justify-items-start' : 'justify-items-center'
        } `}
      >
        <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
          {' '}
          {titleinner}
        </h1>
        <p className="text-slate-200 filter text-base md:text-sm font-normal">{text}</p>
        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex items-center bg-white/80 px-1 rounded blur-effect-theme">
            <h1 className="text-black text-sm font-medium">${price}</h1>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon className="icon-style w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-slate-100">{rating}</h1>
          </div>
        </div>
        {/* <div className="flex items-center gap-3">
          <button
            type="button"
            className="bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200"
          >
            <ShoppingBagIcon className="icon-style text-slate-900" />
          </button>
          <button
            type="button"
            className="bg-white opacity-90 blur-effect-theme button-theme px-2 py-1 shadow-sky-200 text-sm text-black"
          >
            {btn}
          </button>
        </div> */}
      </div>

      <div
        className={`flex items-center ${
          ifExists ? 'absolute top-5 right-1' : 'justify-items-center'
        } `}
      >
        <Image
          src={img}
          width={500} // Adjust the width value in pixels
          height={500} // Height value will be auto
          alt={`img/item-img/${id}`}
          className={`transitions-theme hover:-rotate-12 ${
            ifExists ? 'h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]' : 'h-36 w-64 '
          }  `}
        />
      </div>
    </div>
  );
}

export default ItemCard;
