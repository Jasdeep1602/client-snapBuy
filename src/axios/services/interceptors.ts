import { commonServiceInstance } from '.';

// - - - authServiceInstance interceptor request - - -
commonServiceInstance.interceptors.request.use(
  (request) => {
    const accessToken =
      typeof window !== 'undefined'
        ? `Bearer ${window.sessionStorage.getItem('userAccessToken')}`
        : null;

    // const env = getEnvironments();
    request.headers.Authorization = accessToken;
    request.baseURL = 'http://tradefull-apps-21691982.us-east-2.elb.amazonaws.com/api/v1';
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
