import { commonService } from '@/axios/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchProductInterface, ProductState } from './interface';

const initialState = {
  products: null,
  isFetching: false,
  isProductCreated: false,
  isImageUploaded: false,
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
  reducers: {},

  // middleware extended reducers
  extraReducers: (builder) => {
    // - - - - GET Product   - - - - - - - -
    builder.addCase(getProducts.pending, (init) => {
      const state = init;
      // state.data = null;
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
export default ProductSlice.reducer;
