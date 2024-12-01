import { configureStore } from '@reduxjs/toolkit';
import logoReducer from './slices/logoSlice';
import menuReducer from './slices/menuSlice';
import clockReducer from './slices/clockSlice';

const store = configureStore({
  reducer: {
    logo: logoReducer,
    menu: menuReducer,
    clock: clockReducer
  },
});

export default store;