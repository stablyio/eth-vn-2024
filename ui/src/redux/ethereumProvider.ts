import {
  connectBrowserExtensionWallet,
  getProvider,
  walletGetChainID,
} from "@/libs/providers";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface EthereumProviderState {
  account?: string;
  chainId?: number;
}

const initialState: EthereumProviderState = {};

export const ethereumProviderSlice = createSlice({
  name: "ethereumProvider",
  initialState,
  reducers: {},
  selectors: {
    getChainID: (state) => {
      return state.chainId;
    },
    getAccount: (state) => {
      return state.account;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ethereumProviderInit.fulfilled, (state, action) => {
      state.chainId = action.payload.chainID;
      state.account = action.payload.account;
    });
  },
});

export const ethereumProviderInit = createAsyncThunk<
  {
    chainID?: number;
    account?: string;
  },
  undefined,
  {}
>("ethereumProvider/init", async ({}, { getState, rejectWithValue }) => {
  const account = await connectBrowserExtensionWallet();
  const chainID = await walletGetChainID();

  return {
    chainID,
    account,
  };
});
