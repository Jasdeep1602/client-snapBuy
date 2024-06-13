import { combineReducers } from '@reduxjs/toolkit';
import ProductSlice from './products';

// combine reducer
const rootReducer = combineReducers({
  products: ProductSlice,
});

export default rootReducer;
