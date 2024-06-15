import { commonService } from '@/axios/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchProductInterface, ProductState } from './interface';

const initialState = {
  products: null,
  isFetching: false,
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

      console.log(resp, 'helth');
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
    // updateUser(init, action) {
    //   const state = init;
    //   state.user = { ...state.user, ...action.payload };
    //   const data = action.payload;
    //   const session = window.sessionStorage;
    //   if (data.user) {
    //     session.setItem('cecId', data.user.cecId);
    //   }
    //   if (data.actAsUser) {
    //     session.setItem('actAsId', data.actAsUser.cecId);
    //   }
    //   if (data.userInfo) {
    //     session.setItem('fullName', data.userInfo.name);
    //   }
    // },
    // setIsAuthorized(init, action) {
    //   const state = init;
    //   state.isAuthorized = action.payload;
    // },
    // setIsInvalidUser(init, action) {
    //   const state = init;
    //   state.isInvalidUser = action.payload;
    // },
  },

  // middleware extended reducers
  extraReducers: (builder) => {
    // fetching product categories
    // - - - - Adding Product Categories  - - - - - - - -
    builder.addCase(getProducts.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isFetching = true;
    });
    builder.addCase(getProducts.fulfilled, (init, action) => {
      const state = init;
      state.products = action.payload;
      console.log(action.payload, 'hwhfw');

      state.isFetching = false;
    });
    builder.addCase(getProducts.rejected, (init) => {
      const state = init;
      state.isFetching = false;
    });
  },
});
export default ProductSlice.reducer;
