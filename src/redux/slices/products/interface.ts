export declare interface ProductState {
  productdetails: any;
  products: any;
  productId: any;
  isFetching: boolean;
  isProductCreated: boolean;
  isImageUploaded: boolean;
  updateProduct: boolean;
  userInfo: any;
  cart: any;
  cartToggle: boolean;
  isCartFetching: boolean;
}

export declare interface FetchProductInterface {
  data?: { [key: string]: string | number | object | null | boolean };
  params?: { [key: string]: string | number | object | null };
}
