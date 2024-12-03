import { configureStore } from '@reduxjs/toolkit';
import logoReducer from './slices/logoSlice';
import menuReducer from './slices/menuSlice';
import clockReducer from './slices/clockSlice';
import imagesReducer from './slices/imagesSlice';

const store = configureStore({
  reducer: {
    logo: logoReducer,
    menu: menuReducer,
    clock: clockReducer,
    images: imagesReducer
  },
});

export default store;