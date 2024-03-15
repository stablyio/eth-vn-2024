import { getErc20Contract } from "@/abi/erc20";
import { toReadableAmount } from "@/libs/conversion";
import { getProvider } from "@/libs/providers";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";

export interface WalletState {
  // Current connected wallet address
  address?: string;
  // Contract address => Balance Number
  balances: Record<string, number>;
  readableBalances: Record<string, string>;
}

const initialState: WalletState = {
  address: undefined,
  balances: {},
  readableBalances: {},
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchERC20Balance.fulfilled, (state, action) => {
      const {
        walletAddress,
        contractAddress,
        balanceOfAddress,
        readableBalance,
      } = action.payload;
      // Only update when the wallet address matches with the connected wallet address
      if (walletAddress !== state.address) {
        return;
      }
      state.balances[contractAddress] = balanceOfAddress;
      state.readableBalances[contractAddress] = readableBalance;
    });
  },
});

export const fetchERC20Balance = createAsyncThunk(
  "wallet/fetchBalance",
  async ({
    walletAddress,
    contractAddress,
  }: {
    walletAddress: string;
    contractAddress: string;
  }) => {
    const provider = getProvider();

    const erc20Contract = getErc20Contract(contractAddress, provider);
    const decimals: number = await erc20Contract.decimals();
    const balanceOfAddress: number =
      await erc20Contract.balanceOf(contractAddress);

    const readableBalance = toReadableAmount(balanceOfAddress, decimals);

    return {
      walletAddress,
      contractAddress,
      balanceOfAddress,
      readableBalance,
    };
  }
);
