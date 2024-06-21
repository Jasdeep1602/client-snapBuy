export declare interface ProductState {
  productdetails: any;
  products: any;
  productId: any;
  isFetching: boolean;
  isProductCreated: boolean;
  isImageUploaded: boolean;
  updateProduct: boolean;
}

export declare interface FetchProductInterface {
  data?: { [key: string]: string | number | object | null | boolean };
  params?: { [key: string]: string | number | object | null };
}
