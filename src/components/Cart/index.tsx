'use client';

/* eslint-disable no-underscore-dangle */
import { useAppSelector } from '@/hooks/redux';
import React from 'react';
import { selectTotalAmount, selectTotalQuantity } from '@/redux/slices/products';
import CartCount from './CartCount';
import CartEmpty from './CartEmpty';
import CartItem from './CartItem';

// import { useDispatch, useSelector } from 'react-redux'
// import {
//   selectCartItems,
//   selectCartState,
//   selectTotalAmount,
//   selectTotalQTY,
//   setClearCartItems,
//   setCloseCart,
//   setGetTotals,
// } from '../app/CartSlice.js'
// import CartCount from './cart/CartCount'
// import CartEmpty from './cart/CartEmpty'
// import CartItem from './cart/CartItem'

function Cart() {
  const { cartToggle, cart } = useAppSelector((state) => state.products);
  const totalAmount = useAppSelector(selectTotalAmount);
  const totalQuantity = useAppSelector(selectTotalQuantity);
  //   const dispatch = useDispatch()
  //   const ifCartState = useSelector(selectCartState)
  //   const cartItems = useSelector(selectCartItems)
  //   const totalAmount = useSelector(selectTotalAmount)
  //   const totalQTY = useSelector(selectTotalQTY)

  //   // console.log(cartItems)

  //   useEffect(() => {
  //     dispatch(setGetTotals())
  //   }, [cartItems, dispatch])

  //   const onCartToggle = () => {
  //     dispatch(
  //       setCloseCart({
  //         cartState: false,
  //       })
  //     )
  //   }

  //   const onClearCartItems = () => {
  //     dispatch(setClearCartItems())
  //   }

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme duration-500 w-full h-screen opacity-100 z-[250] ${
        cartToggle ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-8'
      }`}
    >
      <div
        className={`blur-effect-theme duration-500 h-screen max-w-xl w-full absolute right-0 ${
          cartToggle ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-8'
        }`}
      >
        <CartCount totalQuantity={totalQuantity} />
        {cart?.length === 0 ? (
          <CartEmpty />
        ) : (
          <div>
            <div className="flex items-start justify-start flex-col gap-y-4 lg:gap-y-4 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-2">
              {cart?.map((item: any) => <CartItem key={item._id} item={item} />)}
            </div>

            <div className="fixed bottom-0 bg-white w-full px-5 py-2 grid items-center blur-effect-theme">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-semibold uppercase text-blue-600">SubTotal</h1>
                <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                  $ {totalAmount}
                </h1>
              </div>
              <div className="grid items-center gap-2">
                <p className="text-sm font-medium text-center">No Tax Or Shipping Charge</p>
                <button type="button" className="button-theme bg-theme-cart text-white">
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
