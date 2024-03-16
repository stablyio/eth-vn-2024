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
    clearWalletAddress: (state) => {
      state.address = undefined;
      state.balances = {};
      state.readableBalances = {};
    },
    updateWalletAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchERC20Balance.fulfilled, (state, action) => {
      const { contractAddress, balanceOfAddress, readableBalance } =
        action.payload;
      state.balances[contractAddress] = balanceOfAddress;
      state.readableBalances[contractAddress] = readableBalance;
    });
    builder.addCase(fetchERC20Balance.rejected, () => {});
  },
  selectors: {
    getReadableBalance: (state, contractAddress: string) => {
      return state.readableBalances[contractAddress];
    },
    getAllBalances: (state) => {
      return state.balances;
    },
    getAllReadableBalances: (state) => {
      return state.readableBalances;
    },
    getAddress: (state) => {
      return state.address;
    },
  },
});

export const fetchERC20Balance = createAsyncThunk<
  {
    contractAddress: string;
    balanceOfAddress: number;
    readableBalance: string;
  },
  { contractAddress: string },
  { state: { wallet: WalletState } }
>(
  "wallet/fetchBalance",
  async ({ contractAddress }, { getState, rejectWithValue }) => {
    if (!contractAddress) {
      return rejectWithValue({ error: "No contract address provided" });
    }
    const provider = getProvider();

    const walletAddress = getState().wallet.address;
    if (!walletAddress) {
      return rejectWithValue({ error: "No contract address provided" });
    }

    const erc20Contract = getErc20Contract(contractAddress, provider);
    let decimals: number = 0;
    try {
      decimals = await erc20Contract.decimals();
    } catch (e) {
      // ERC721 has not decimal
    }

    const balanceOfAddress: BigNumber =
      await erc20Contract.balanceOf(walletAddress);

    const balanceOfAddressNumber = balanceOfAddress.toNumber();
    const readableBalance = toReadableAmount(balanceOfAddressNumber, decimals);

    return {
      contractAddress,
      balanceOfAddress: balanceOfAddressNumber,
      readableBalance,
    };
  }
);
