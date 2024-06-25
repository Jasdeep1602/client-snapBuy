import axios from 'axios';

import { Props } from '../interfaces';

// instances for different micro services

export const commonServiceInstance = axios.create();

// - - - instance specific services - - -

export const commonService = (props: Props) => {
  const url = `${props?.url ?? ''}`;
  return commonServiceInstance({
    ...props,
    url,
  });
};

// cookie retrieve function fron document

// function getCookie(name: string): string | undefined {
//   const cookieValue = `; ${document.cookie}`;
//   const cookieParts = cookieValue.split(`; ${name}=`);

//   if (cookieParts.length === 2) {
//     return cookieParts.pop()?.split(';').shift();
//   }

//   return undefined; // Return undefined if the cookie is not found
// }
// - - - authServiceInstance interceptor request - - -
commonServiceInstance.interceptors.request.use(
  (request) => {
    request.baseURL = 'https://server-snapbuy.onrender.com';

    // Set custom headers
    request.headers['Content-Type'] = 'application/json';

    // Retrieve the token from the cookies
    // const token = getCookie('refreshtoken'); // Adjust the cookie name based on your setup
    // if (token) {
    // request.headers.Authorization = `Bearer ${token}`;
    // }

    // Include credentials with requests
    request.withCredentials = true;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// - - -  authServiceInstance interceptor response - - -
commonServiceInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response.status) {
      case 401:
        // localStorage.clear();
        // document.location.href = '/';
        break;
      case 400:
        // toast.error(error.response.data.message);
        break;
      default:
        break;
      // toast.error('Something really went wrong, please try again');
    }
    return Promise.reject(error);
  }
);
