'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function PaymentFailure() {
  const router = useRouter();
  const handleHomeRoute = () => {
    router.push('/');
  };
  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6 md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-red-600 w-16 h-16 mx-auto my-6"
          style={{ borderRadius: '50%' }}
        >
          <path
            fill="currentColor"
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm5 13.414l-1.414 1.414L12 13.414l-3.586 3.586L7 15.414 10.586 12 7 8.586 8.414 7.172 12 10.586l3.586-3.586L17 8.586 13.414 12 17 15.414z"
          />
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Failed
          </h3>
          <p className="text-gray-600 my-2">Sorry, your payment could not be completed.</p>
          <p>Please try again or contact support.</p>
          <div className="py-10 text-center">
            <button
              type="button"
              aria-label="failure"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              onClick={handleHomeRoute}
            >
              GO HOME
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
