import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

import permissions from './reducers/permissions';
import vehicles from './reducers/vehicles';

const store = configureStore({
  reducer: {
    permissions,
    vehicles,
  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
