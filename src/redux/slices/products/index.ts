/* eslint-disable no-underscore-dangle */
import { commonService } from '@/axios/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { InitialProductDetailsProps } from '@/app/(home)/admin-page/interface';
import { FetchProductInterface, ProductState } from './interface';

const initialProductDetails: InitialProductDetailsProps = {
  product_id: '',
  title: '',
  price: '',
  description: '',
  images: null,
  gradientFrom: '',
  gradientTo: '',
  shadowColor: '',
  rating: '',
};

const initialState = {
  productdetails: initialProductDetails,
  products: null,
  userInfo: null,
  cart: [],
  isFetching: false,
  isProductCreated: false,
  isImageUploaded: false,
  productId: null,
  updateProduct: false,
  cartToggle: false,
  isCartFetching: false,
} as ProductState;

export const getProducts = createAsyncThunk(
  'getProduct',
  async (payload: FetchProductInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'GET',
        url: 'api/products',
        data: payload?.data,
        params: payload?.params,
        cancelToken: source.token,
      });

      return resp?.data;
    } catch (error: any) {
      return thunkAPI?.rejectWithValue(error?.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  'createProduct',
  async (payload: FetchProductInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'POST',
        url: 'api/products',
        data: payload?.data,
        params: payload?.params,
        cancelToken: source.token,
      });

      return resp?.data;
    } catch (error: any) {
      return thunkAPI?.rejectWithValue(error?.message);
    }
  }
);

export const uploadImage = createAsyncThunk(
  'uploadImage',
  async (payload: FetchProductInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'POST',
        url: 'api/upload',
        data: payload?.data,
        params: payload?.params,
        cancelToken: source.token,
      });

      return resp?.data;
    } catch (error: any) {
      return thunkAPI?.rejectWithValue(error?.message);
    }
  }
);

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductDetails(init, action) {
      const state = init;
      state.productdetails = action.payload;
    },
    resetProductDetails: (init) => {
      const state = init;
      state.productdetails = initialProductDetails;
    },
    setProductId: (init, action) => {
      const state = init;
      state.productId = action.payload;
    },
    setUpdateProduct: (init, action) => {
      const state = init;
      state.updateProduct = action.payload;
    },

    setUserInfo: (init, action) => {
      const state = init;
      state.userInfo = action.payload;
    },

    setCart: (init, action) => {
      const state = init;
      state.cart = action.payload;
    },

    setCartToggle: (init, action) => {
      const state = init;
      state.cartToggle = action.payload;
    },

    setIsCartFetching: (init, action) => {
      const state = init;
      state.isCartFetching = action.payload;
    },
  },

  // middleware extended reducers
  extraReducers: (builder) => {
    // - - - - GET Product   - - - - - - - -
    builder.addCase(getProducts.pending, (init) => {
      const state = init;
      // state.products = null;
      state.isFetching = true;
    });
    builder.addCase(getProducts.fulfilled, (init, action) => {
      const state = init;
      state.products = action.payload;
      state.isFetching = false;
    });
    builder.addCase(getProducts.rejected, (init) => {
      const state = init;
      state.isFetching = false;
    });

    // - - - - Create Product   - - - - - - - -
    builder.addCase(createProduct.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isProductCreated = true;
    });
    builder.addCase(createProduct.fulfilled, (init, action) => {
      const state = init;
      state.products = action.payload;
      state.isProductCreated = false;
    });
    builder.addCase(createProduct.rejected, (init) => {
      const state = init;
      state.isProductCreated = false;
    });

    // - - - - Upload Image   - - - - - - - -
    builder.addCase(uploadImage.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isImageUploaded = true;
    });
    builder.addCase(uploadImage.fulfilled, (init, action) => {
      const state = init;
      state.products = action.payload;
      state.isImageUploaded = false;
    });
    builder.addCase(uploadImage.rejected, (init) => {
      const state = init;
      state.isImageUploaded = false;
    });
  },
});

// Create selectors to compute total amount and total quantity
export const selectTotalAmount = (state: any) =>
  state.products.cart.reduce((total: any, item: any) => total + item.price * item.quantity, 0);

export const selectTotalQuantity = (state: any) =>
  state.products.cart.reduce((total: any, item: any) => total + item.quantity, 0);

export const {
  setProductDetails,
  resetProductDetails,
  setProductId,
  setUpdateProduct,
  setUserInfo,
  setCart,
  setCartToggle,
  setIsCartFetching,
} = ProductSlice.actions;

export default ProductSlice.reducer;
