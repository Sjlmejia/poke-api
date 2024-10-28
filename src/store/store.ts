import { configureStore } from '@reduxjs/toolkit';
import combatReducer from './combatSlice';

export const store = configureStore({
  reducer: {
    combat: combatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
