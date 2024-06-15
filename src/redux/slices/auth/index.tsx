import { commonService } from '@/axios/services';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchAuthInterface, AuthState } from './interface';

const initialState = {
  token: null,
  isLoginFetching: false,
  isRegFetching: false,
} as AuthState;

export const authLogin = createAsyncThunk(
  'login',
  async (payload: FetchAuthInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'POST',
        url: 'user/login',
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
export const authRegister = createAsyncThunk(
  'register',
  async (payload: FetchAuthInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'POST',
        url: 'user/register',
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

export const authRefreshToken = createAsyncThunk(
  'refreshtoken',
  async (payload: FetchAuthInterface | undefined, thunkAPI) => {
    const source = axios.CancelToken.source();
    thunkAPI.signal.addEventListener('abort', () => {
      source.cancel();
    });
    try {
      const resp = await commonService({
        method: 'POST',
        url: 'user/refreshtoken',
        data: payload?.data,
        params: payload?.params,
        cancelToken: source.token,
      });

      console.log(resp, 'token');
      return resp?.data;
    } catch (error: any) {
      return thunkAPI?.rejectWithValue(error?.message);
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
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
    builder.addCase(authLogin.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isLoginFetching = true;
    });
    builder.addCase(authLogin.fulfilled, (init, action) => {
      const state = init;
      console.log(action.payload, 'hwhfw');

      state.isLoginFetching = false;
    });
    builder.addCase(authLogin.rejected, (init) => {
      const state = init;
      state.isLoginFetching = false;
    });

    builder.addCase(authRegister.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isRegFetching = true;
    });
    builder.addCase(authRegister.fulfilled, (init, action) => {
      const state = init;
      console.log(action.payload, 'hwhfw');

      state.isRegFetching = false;
    });
    builder.addCase(authRegister.rejected, (init) => {
      const state = init;
      state.isRegFetching = false;
    });

    builder.addCase(authRefreshToken.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isRegFetching = true;
    });
    builder.addCase(authRefreshToken.fulfilled, (init, action) => {
      const state = init;
      // state.token = action.payload;
      console.log(action.payload, 'refresh');

      state.isRegFetching = false;
    });
    builder.addCase(authRefreshToken.rejected, (init) => {
      const state = init;
      state.isRegFetching = false;
    });
  },
});
export default AuthSlice.reducer;