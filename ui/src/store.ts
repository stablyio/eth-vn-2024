import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from "@reduxjs/toolkit";
import { walletSlice } from "./redux/wallet";
import { borrowLending } from './redux/borrowlending';
import { ethereumProviderSlice } from './redux/ethereumProvider';

export const store = configureStore({
  reducer: {
    wallet: walletSlice.reducer,
    borrowLending: borrowLending.reducer,
    ethereumProvider: ethereumProviderSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


