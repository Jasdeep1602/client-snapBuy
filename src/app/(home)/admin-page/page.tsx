'use client';

/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */

import CustomButton from '@/components/CustomButton';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { resetProductDetails, setProductDetails, setUpdateProduct } from '@/redux/slices/products';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '@heroicons/react/24/outline';
import {
  ImageProps,
  // InitialProductDetailsProps
} from './interface';

export default function CreateProduct() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const { productdetails, productId, updateProduct } = useAppSelector((state) => state.products);

  // local state
  const [isImageUploading, setIsImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Add ref for file input

  // Define a type for the image object

  // const initialProductDetails: InitialProductDetailsProps = {
  //   product_id: '',
  //   title: '',
  //   price: '',
  //   description: '',
  //   images: null,
  //   gradientFrom: '',
  //   gradientTo: '',
  //   shadowColor: '',
  //   rating: '',
  // };
  // const [productdetails, setProductDetails] =
  //   useState<InitialProductDetailsProps>(initialProductDetails);
  const [productcreated, setProductCreated] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    // setProductDetails({ ...productdetails, [name]: value });
    dispatch(setProductDetails({ ...productdetails, [name]: value }));
  };

  // image upload api call

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setIsImageUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);
        const userRes = await axios.post('http://localhost:5000/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data', Authorization: token },
          withCredentials: true,
        });

        toast.success('Image Upload Success');
        // setProductDetails({ ...productdetails, images: userRes?.data as ImageProps });

        dispatch(setProductDetails({ ...productdetails, images: userRes?.data as ImageProps }));
      } catch (error) {
        toast.error('Image Upload Error');
      } finally {
        setIsImageUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset the file input
        }
      }
    }
  };

  // crreate product api

  const handleCancelCreateProduct = (e: any) => {
    e.preventDefault();
    // setProductDetails(initialProductDetails);

    dispatch(resetProductDetails());
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }

    dispatch(setUpdateProduct(false));
  };

  const handleImageClear = () => {
    // setProductDetails({ ...productdetails, images: null });
    dispatch(setProductDetails({ ...productdetails, images: null }));

    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const handleCreateAndUpdateProduct = async (e: any) => {
    e.preventDefault();

    // update the product if updateProduct true, else create product

    if (updateProduct) {
      setProductCreated(true);

      try {
        await axios.put(`http://localhost:5000/api/products/${productId}`, productdetails, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        toast.success('Product Updated Successfully');
      } catch (err) {
        toast.error('Create Update Failed');
      } finally {
        // setProductDetails(initialProductDetails);
        dispatch(resetProductDetails());
        setProductCreated(false);
        dispatch(setUpdateProduct(false));
      }
    } else {
      setProductCreated(true);

      try {
        await axios.post('http://localhost:5000/api/products', productdetails, {
          headers: {
            Authorization: token,
          },
          withCredentials: true,
        });
        toast.success('Product Created Successfully');
      } catch (err) {
        toast.error('Create Product Failed');
      } finally {
        // setProductDetails(initialProductDetails);
        dispatch(resetProductDetails());
        setProductCreated(false);
      }
    }
  };

  const handleHomeRoute = () => {
    router.push('/');
  };

  // update product

  // const handleUpdateProduct = async (e: any) => {
  //   e.preventDefault();
  //   setProductCreated(true);

  //   try {
  //     await axios.put(`http://localhost:5000/api/products/${productId}`, productdetails, {
  //       headers: {
  //         Authorization: token,
  //       },
  //       withCredentials: true,
  //     });
  //     toast.success('Product Updated Successfully');
  //   } catch (err) {
  //     toast.error('Create Update Failed');
  //   } finally {
  //     // setProductDetails(initialProductDetails);
  //     dispatch(resetProductDetails());
  //     setProductCreated(false);
  //   }
  // };

  return (
    <>
      <div className="m-12 p-5 flex justify-center items-center border border-gray-900/10 pb-12 rounded">
        <form onSubmit={handleCreateAndUpdateProduct}>
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold leading-7 text-blue-500">
              {updateProduct ? 'Update' : 'Create'} Product
            </h2>
            <p className="text-sm leading-6 text-gray-600">
              Fill all the details to{' '}
              {updateProduct ? 'update a existing product' : 'create a new product'}.
            </p>

            <div className="mt-10 grid  gap-x-48 gap-y-10 grid-cols-2">
              <div className="flex items-center gap-5 justify-between">
                <label
                  htmlFor="product_id"
                  className=" block text-sm font-medium leading-6 text-gray-900"
                >
                  Product ID :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="product_id"
                      id="product_id"
                      value={productdetails?.product_id}
                      autoComplete="Product ID"
                      className={`block flex-1 border-0 ${updateProduct ? ' bg-slate-100' : 'bg-transparent'} py-1.5 pl-1 ${updateProduct ? ' text-gray-400' : 'text-gray-900'} placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                      onChange={handleInputChange}
                      placeholder=""
                      required
                      disabled={updateProduct}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center  gap-5 justify-between">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={productdetails.title}
                      onChange={handleInputChange}
                      autoComplete="Title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5 ">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="description"
                      id="description"
                      value={productdetails.description}
                      onChange={handleInputChange}
                      autoComplete="Description"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="price"
                      id="price"
                      value={productdetails.price}
                      onChange={handleInputChange}
                      autoComplete="Price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <label
                  htmlFor="rating"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Rating :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="rating"
                      id="rating"
                      value={productdetails.rating}
                      onChange={handleInputChange}
                      autoComplete="Rating"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <label
                  htmlFor="gradientFrom"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gradient From :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="gradientFrom"
                      id="gradientFrom"
                      value={productdetails.gradientFrom}
                      onChange={handleInputChange}
                      autoComplete="Gradient From"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <label
                  htmlFor="gradientTo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Gradient To :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="gradientTo"
                      id="gradientTo"
                      value={productdetails.gradientTo}
                      onChange={handleInputChange}
                      autoComplete="Gradient To"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between gap-5">
                <label
                  htmlFor="shadowColor"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Shadow Color :
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500">
                    <input
                      type="text"
                      name="shadowColor"
                      id="shadowColor"
                      value={productdetails.shadowColor}
                      onChange={handleInputChange}
                      autoComplete="Shadow Color"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="images"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>

                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="images"
                        className={`relative ${!productdetails?.images ? 'cursor-pointer' : 'cursor-not-allowed'} rounded-md bg-white font-semibold ${!productdetails?.images ? 'text-blue-500' : 'text-green-500'} focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-indigo-500`}
                      >
                        <span>
                          {!productdetails?.images
                            ? isImageUploading
                              ? 'Uploading Image...'
                              : 'Upload a Image'
                            : 'Image Upload Success'}
                        </span>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          ref={fileInputRef} // Attach ref to the file input
                          disabled={productdetails?.images !== null}
                        />
                      </label>
                      <p className="pl-1">{!productdetails?.images ? 'or drag and drop' : ''}</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <CustomButton
                  typeButton="button"
                  className="flex items-center justify-center rounded-md bg-rose-700 mt-2 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 shrink-0 "
                  text="Clear Image"
                  onClick={handleImageClear}
                />
                {productdetails?.images?.url && (
                  <div className="mt-4 flex justify-center">
                    <Image
                      src={productdetails?.images?.url}
                      width={500} // Adjust the width value in pixels
                      height={500} // Height value will be auto
                      alt="Uploaded"
                      className="h-32 object-cover rounded-lg w-auto bg-slate-100 p-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center  gap-5 justify-end gap-x-6">
            {/* <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Save
          </button> */}
            <CustomButton
              typeButton="button"
              className="flex items-center justify-center rounded-md  bg-slate-200 px-3 py-2 text-sm font-semibold  text-black shadow-sm hover:bg-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
              text="Cancel"
              onClick={handleCancelCreateProduct}
            />
            <CustomButton
              typeButton="submit"
              className="flex items-center justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 shrink-0 "
              text={updateProduct ? 'Update' : 'Save'}
              loadingState={productcreated}
            />
          </div>
        </form>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          aria-label="Home"
          className="bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700"
          onClick={handleHomeRoute}
        >
          <HomeIcon className="w-6 h-6" />
        </button>
      </div>
    </>
  );
}
