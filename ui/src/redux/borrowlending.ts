import { getQuadraticLendingCompound } from "@/abi/borrowLendingCompound";
import {
  TransactionState,
  getProvider,
  sendTransaction,
} from "@/libs/providers";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BigNumber } from "ethers";
import { WalletState } from "./wallet";
import { CompoundLendPool, LendUserInfo } from "@/libs/contracts";

export interface BorrowLendingState {
  lendingContractAddress: string;
  borrowContractAddress: string;
  loading: boolean;
  errorMessage: string;
  lendUserInfo: Record<number, LendUserInfo>;
}

const initialState: BorrowLendingState = {
  lendingContractAddress: "",
  borrowContractAddress: "",
  loading: false,
  errorMessage: "",
  lendUserInfo: {},
};

function getLendingContract(
  getState: () => {
    borrowLending: BorrowLendingState;
  },
  rejectWithValue: (value: { error: string }) => void
) {
  const contractAddress = getState().borrowLending.lendingContractAddress;
  if (!contractAddress) {
    return rejectWithValue({ error: "No contract address provided" });
  }

  const provider = getProvider();
  if (!provider) {
    return rejectWithValue({ error: "No provider" });
  }

  const lendingContract = getQuadraticLendingCompound(
    contractAddress,
    provider
  );

  return lendingContract;
}

function getBorrowContract(
  getState: () => {
    borrowLending: BorrowLendingState;
  },
  rejectWithValue: (value: { error: string }) => void
) {
  const contractAddress = getState().borrowLending.borrowContractAddress;
  if (!contractAddress) {
    return rejectWithValue({ error: "No contract address provided" });
  }

  const provider = getProvider();
  if (!provider) {
    return rejectWithValue({ error: "No provider" });
  }

  const lendingContract = getQuadraticLendingCompound(
    contractAddress,
    provider
  );

  return lendingContract;
}

export const borrowLending = createSlice({
  name: "borrowLending",
  initialState,
  reducers: {
    updateLendingContractAddress: (state, action: PayloadAction<string>) => {
      state.lendingContractAddress = action.payload;
    },
    updateBorrowContractAddress: (state, action: PayloadAction<string>) => {
      state.borrowContractAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLend.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLend.fulfilled, (state) => {
      state.loading = false;
      state.errorMessage = "";
    });
    builder.addCase(userLend.rejected, (state, action) => {
      state.loading = false;
      if (action.payload) {
        state.errorMessage = action.payload.error;
      } else {
        state.errorMessage = action.error.message;
      }
    });

    builder.addCase(getLendingPoolOfCurrentWallet.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getLendingPoolOfCurrentWallet.fulfilled,
      (
        state,
        action: PayloadAction<{ lendPools: Record<number, LendUserInfo> }>
      ) => {
        state.loading = false;
        state.errorMessage = "";
        state.lendUserInfo = action.payload.lendPools;
      }
    );
    builder.addCase(getLendingPoolOfCurrentWallet.rejected, (state, action) => {
      state.loading = false;
      // if (action.payload) {
      //   state.errorMessage = action.payload.error;
      // } else {
      //   state.errorMessage = action.error.message;
      // }
    });
  },
  selectors: {
    getLendingContractAddress: (state: BorrowLendingState) =>
      state.lendingContractAddress,
    getLoading: (state: BorrowLendingState) => state.loading,
    getErrorMessage: (state: BorrowLendingState) => state.errorMessage,
    getLendUserInfo: (state: BorrowLendingState) => state.lendUserInfo,
  },
});

export const userLend = createAsyncThunk<
  {},
  { lendingPoolId: number; amount: number },
  {
    state: { borrowLending: BorrowLendingState; wallet: WalletState };
    rejectValue: { error: string };
  }
>(
  "lending/userLend",
  async ({ lendingPoolId, amount }, { getState, rejectWithValue }) => {
    const walletAddress = getState().wallet.address;

    const lendingContract = await getLendingContract(getState, rejectWithValue);
    if (!lendingContract) {
      return rejectWithValue({ error: "No lending contract" });
    }

    const transaction = await lendingContract.populateTransaction.userLend(
      lendingPoolId,
      BigNumber.from(amount)
    );
    const transactionData = await sendTransaction({
      ...transaction,
      from: walletAddress,
    });
    console.log("transactionData", transactionData);
    if (transactionData != TransactionState.Sent) {
      return rejectWithValue({ error: "Transaction failed" });
    }

    return {};
  }
);

export const userRedeem = createAsyncThunk<
  {},
  { lendingPoolId: number; amount: number },
  {
    state: { borrowLending: BorrowLendingState; wallet: WalletState };
    rejectValue: { error: string };
  }
>(
  "lending/userRedeem",
  async ({ lendingPoolId, amount }, { getState, rejectWithValue }) => {
    const walletAddress = getState().wallet.address;

    const lendingContract = await getLendingContract(getState, rejectWithValue);
    if (!lendingContract) {
      return rejectWithValue({ error: "No lending contract" });
    }

    const transaction = await lendingContract.populateTransaction.userRedeem(
      lendingPoolId,
      BigNumber.from(amount)
    );
    await sendTransaction({
      ...transaction,
      from: walletAddress,
    });

    return {};
  }
);

export const getLendingPoolOfCurrentWallet = createAsyncThunk<
  { lendPools: Record<number, LendUserInfo> },
  undefined,
  {
    state: { borrowLending: BorrowLendingState; wallet: WalletState };
    rejectValue: { error: string };
  }
>("lending/getLendUserInfos", async (_, { getState, rejectWithValue }) => {
  const lendingContract = await getLendingContract(getState, rejectWithValue);
  if (!lendingContract) {
    return rejectWithValue({ error: "No lending contract" });
  }

  const walletAddress = getState().wallet.address;
  if (!walletAddress) {
    return rejectWithValue({ error: "No wallet address" });
  }

  const poolId = 1;
  const lendPool: LendUserInfo = await lendingContract.lendUserInfos(
    walletAddress,
    poolId
  );
  // console.log("get lend user info", walletAddress, poolId, lendPool)

  if (!lendPool.currTotalLend) {
    return rejectWithValue({ error: "No pool token" });
  }

  return {
    lendPools: {
      [poolId]: lendPool,
    },
  };
});

export const userBorrow = createAsyncThunk<
  {},
  { amount: number },
  {
    state: { borrowLending: BorrowLendingState; wallet: WalletState };
    rejectValue: { error: string };
  }
>("borrow/userBorrow", async ({ amount }, { getState, rejectWithValue }) => {
  const walletAddress = getState().wallet.address;

  const borrowContract = await getBorrowContract(getState, rejectWithValue);
  if (!borrowContract) {
    return rejectWithValue({ error: "No lending contract" });
  }

  //TODO: Get pool ID from lpTokenAddress
  const poolIdFromToken = 2;
  const transaction = await borrowContract.populateTransaction.v3NFTBorrow(
    0,
    poolIdFromToken,
    BigNumber.from(amount)
  );
  await sendTransaction({
    ...transaction,
    from: walletAddress,
  });

  return {};
});
