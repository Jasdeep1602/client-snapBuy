'use client';

/* eslint-disable no-underscore-dangle */

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBagIcon, StarIcon, TrashIcon, PencilSquareIcon } from '@heroicons/react/16/solid';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import './card.css';
import axios from 'axios';
import { toast } from 'sonner';
import {
  getProducts,
  setCart,
  setCartToggle,
  setIsCartFetching,
  setProductDetails,
  setProductId,
  setUpdateProduct,
  setUserInfo,
} from '@/redux/slices/products';
import { useRouter } from 'next/navigation';
import { CardProps } from './interface';
import Modal from '../Modal';

export default function ShoeCard({
  _id,
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
  // global states
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAdmin, isLogged, token } = useAppSelector((state) => state.auth);
  const { productId } = useAppSelector((state) => state.products);

  // local state

  const [deleteproduct, setDeleteProduct] = useState(false);
  const [open, setOpen] = useState(false);
  // const [productId, setProductId] = useState('');

  const handleOpenModal = (id: any) => {
    // setProductId(id);
    dispatch(setProductId(id));
    setOpen(true);
  };

  const handleDelete = async () => {
    setDeleteProduct(true);
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: { Authorization: token },
        withCredentials: true,
      });
      setOpen(false);

      toast.success('Product Deleted Successfully');
      dispatch(getProducts({}));
    } catch (err) {
      toast.error('Product Delete Failed');
    } finally {
      setDeleteProduct(false);
    }
  };

  const fetchProductToUpdate = async (id: any) => {
    // setProductId(id);

    dispatch(setProductId(id));

    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: token },
        withCredentials: true,
      });

      // set the product details to the selected product to form

      const productData = res.data;
      dispatch(
        setProductDetails({
          product_id: productData.product_id,
          title: productData.title,
          description: productData.description,
          price: productData.price,
          rating: productData.rating,
          images: productData.images,
          gradientFrom: productData.gradientFrom,
          gradientTo: productData.gradientTo,
          shadowColor: productData.shadowColor,
        })
      );
      dispatch(setUpdateProduct(true));
      toast.success('Product Fetched Successfully');
      router.push('/admin-page');
    } catch (err) {
      toast.error('Product Fetch Failed');
    }
  };

  // add item to cart

  const handleAddToCart = async () => {
    const itemData = {
      _id,
      product_id,
      title,
      price,
      description,
      images,
      gradientFrom,
      gradientTo,
      shadowColor,
      quantity: 1,
    };
    try {
      dispatch(setIsCartFetching(true));
      const res = await axios.post('http://localhost:5000/user/add-to-cart', itemData, {
        headers: { Authorization: token },
        withCredentials: true,
      });

      toast.success('Item Added to Cart');
      dispatch(setCart(res?.data?.user?.cart));
      dispatch(setUserInfo(res?.data?.user));
    } catch (err) {
      toast.error('Failed To Add Item To Cart');
    } finally {
      dispatch(setIsCartFetching(false));
    }
  };

  const handleAddAndOpenCArt = () => {
    handleAddToCart();
    dispatch(setCartToggle(true));
  };
  // css style from dynamic

  const cardBgStyle = {
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    boxShadow: `0 10px 15px -3px ${shadowColor}, 0 4px 6px -4px ${shadowColor}`,
  };

  return (
    <>
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
              <>
                <button
                  type="button"
                  aria-label="shopping"
                  className="bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200"
                  onClick={handleAddToCart}
                >
                  <ShoppingBagIcon className="icon-style text-slate-900" />
                </button>
                <button
                  type="button"
                  aria-label="shopping"
                  className="bg-white opacity-90 blur-effect-theme button-theme px-2 py-1 shadow-sky-200 text-sm font-medium text-black"
                  onClick={handleAddAndOpenCArt}
                >
                  Buy Now
                </button>
              </>
            )}
            {isAdmin && (
              <>
                <button
                  type="button"
                  aria-label="shopping"
                  className={`bg-white opacity-90 blur-effect-theme button-theme p-0.5 shadow-sky-200 ${deleteproduct ? ' cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => handleOpenModal(_id)}
                  disabled={deleteproduct}
                >
                  <TrashIcon
                    className={`icon-style ${deleteproduct ? 'text-slate-400' : 'text-slate-900'}`}
                  />
                </button>
                <button
                  type="button"
                  aria-label="shopping"
                  onClick={() => fetchProductToUpdate(_id)}
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

      {/* Modal for delete */}

      <Modal
        open={open}
        setOpen={setOpen}
        handleDeleteProduct={handleDelete}
        loadingState={deleteproduct}
      />
    </>
  );
}
