import { configureStore } from '@reduxjs/toolkit';
import logoReducer from './slices/logoSlice';
import menuReducer from './slices/menuSlice';
import clockReducer from './slices/clockSlice';
import imagesReducer from './slices/imagesSlice';
import gameReducer from './slices/gameSlice';

const store = configureStore({
  reducer: {
    logo: logoReducer,
    menu: menuReducer,
    clock: clockReducer,
    images: imagesReducer,
    game: gameReducer
  },
});

export default store;