import { configureStore } from '@reduxjs/toolkit';
import reducers from './slices';

export const store = configureStore({
  reducer: reducers
});

// Define RootState type
export type RootState = ReturnType<typeof store.getState>;

export default store;
