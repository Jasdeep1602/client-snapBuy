import { commonServiceInstance } from '.';

// - - - authServiceInstance interceptor request - - -
commonServiceInstance.interceptors.request.use(
  (request) => {
    // request.baseURL = 'https://server-snapbuy.onrender.com';

    // Set custom headers
    request.headers['Content-Type'] = 'application/json';

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
