import { combineReducers } from '@reduxjs/toolkit';
import AuthSlice from './auth';

import ProductSlice from './products';

// combine reducer
const rootReducer = combineReducers({
  auth: AuthSlice,

  products: ProductSlice,
});

export default rootReducer;
