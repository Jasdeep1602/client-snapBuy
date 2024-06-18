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
        method: 'GET',
        url: 'user/refreshtoken',
        data: payload?.data,
        params: payload?.params,
        cancelToken: source.token,
      });

      console.log(resp, 'asynctoken');
      return resp?.data;
    } catch (error: any) {
      return thunkAPI?.rejectWithValue(error?.message);
    }
  }
);

// export const getUser = createAsyncThunk(
//   'getUser',
//   async (payload: FetchAuthInterface | undefined, thunkAPI) => {
//     const source = axios.CancelToken.source();
//     thunkAPI.signal.addEventListener('abort', () => {
//       source.cancel();
//     });
//     try {
//       const resp = await commonService({
//         method: 'GET',
//         url: 'user/',
//         data: payload?.data,
//         params: payload?.params,
//         cancelToken: source.token,
//       });

//       console.log(resp, 'asynctoken');
//       return resp?.data;
//     } catch (error: any) {
//       return thunkAPI?.rejectWithValue(error?.message);
//     }
//   }
// );

// export const getUser = createAsyncThunk('getUser', async (token: string | null, thunkAPI) => {
//   try {
//     const resp = await commonService({
//       method: 'GET',
//       url: 'user/infor',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return resp.data;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(init, action) {
      const state = init;
      state.token = action.payload;
    },
    // setIsInvalidUser(init, action) {
    //   const state = init;
    //   state.isInvalidUser = action.payload;
    // },
  },

  // middleware extended reducers
  extraReducers: (builder) => {
    // - - - - Adding Login  - - - - - - - -
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

    // - - - - Adding Register  - - - - - - - -

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

    // - - - - Adding RefreshToken  - - - - - - - -

    builder.addCase(authRefreshToken.pending, (init) => {
      const state = init;
      // state.data = null;
      state.isRegFetching = true;
    });
    builder.addCase(authRefreshToken.fulfilled, (init, action) => {
      const state = init;
      // state.token = action.payload;
      state.token = action.payload?.accesstoken;
      state.isRegFetching = false;
    });
    builder.addCase(authRefreshToken.rejected, (init) => {
      const state = init;
      state.isRegFetching = false;
    });
  },
});
export default AuthSlice.reducer;
