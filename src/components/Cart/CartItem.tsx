import React from 'react';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import './cartitem.css';
// import { useDispatch } from 'react-redux';
// import {
//   setDecreaseItemQTY,
//   setIncreaseItemQTY,
//   setRemoveItemFromCart,
// } from '../../app/CartSlice.js';

function CartItem() {
  //   const dispatch = useDispatch();

  //   const onRemoveItem = () => {
  //     dispatch(
  //       setRemoveItemFromCart({
  //         id,
  //         title,
  //         text,
  //         img,
  //         color,
  //         shadow,
  //         price,
  //         cartQuantity,
  //       })
  //     );
  //   };

  //   const onIncreaseItemQTY = () => {
  //     dispatch(
  //       setIncreaseItemQTY({
  //         id,
  //         title,
  //         text,
  //         img,
  //         color,
  //         shadow,
  //         price,
  //         cartQuantity,
  //       })
  //     );
  //   };
  //   const onDecreaseItemQTY = () => {
  //     dispatch(
  //       setDecreaseItemQTY({
  //         id,
  //         title,
  //         text,
  //         img,
  //         color,
  //         shadow,
  //         price,
  //         cartQuantity,
  //       })
  //     );
  //   };

  // css style from dynamic

  //   const cardBgStyle = {
  //     background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
  //     boxShadow: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`,
  //   };

  return (
    <div className="flex items-center justify-between w-full px-5">
      <div className="flex items-center gap-5">
        <div
          className="relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center"
          //   style={cardBgStyle}
        >
          <Image
            width={500}
            height={500}
            src="/emptybag.png"
            alt="1"
            // {`img/cart-item/${id}`}
            className="w-36 h-auto object-fill lg:w-28"
          />
          <div className="absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded">
            {/* ${price} */}1
          </div>
        </div>
        <div className="grid items-center gap-4">
          <div className="grid items-center leading-none">
            <h1 className="font-medium text-lg text-slate-900 lg:text-sm">{/* {title} */}1 </h1>
            <p className="text-sm text-slate-800 lg:text-xs">{/* {text} */}1 </p>
          </div>
          <div className="flex items-center justify-around w-full">
            <button
              type="button"
              aria-label="decrease"
              //   onClick={onDecreaseItemQTY}
              className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90"
            >
              <MinusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
            </button>
            <div className="bg-theme-cart rounded text-white font-medium lg:text-xs w-7 h-6 lg:h-5 lg:w-6 flex items-center justify-center">
              {/* {cartQuantity} */} 1
            </div>
            <button
              type="button"
              aria-label="increase"
              //   onClick={onIncreaseItemQTY}
              className="bg-theme-cart rounded w-6 h-6 lg:w-5 lg:h-5 flex items-center justify-center active:scale-90"
            >
              <PlusIcon className="w-5 h-5 lg:w-4 lg:h-4 text-white stroke-[2]" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid items-center gap-5">
        <div className="grid items-center justify-center">
          <h1 className="text-lg lg:text-base text-slate-900 font-medium">
            {/* ${price * cartQuantity} */} 1
          </h1>
        </div>
        <div className="grid items-center justify-center">
          <button
            type="button"
            aria-label="remove"
            className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer"
            // onClick={onRemoveItem}
          >
            <TrashIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
