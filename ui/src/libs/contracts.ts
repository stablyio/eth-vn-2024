import { ethers } from "ethers";
import { getProvider } from "./providers";
import { CurrentConfig } from "@/config";

export interface LendUserInfo {
    lastLendInterestShare: number;
    unRecvInterests: number;
    currTotalLend: number;
    userDli: number;
}

export interface CompoundLendPool {
    token: string;
    spToken: string;
    curSupply: number;
    curBorrow: number;
    totalRecvInterests: number; //User receives interest
}

export function getLendingBorrowContract(): ethers.Contract {
    const provider = getProvider()
    if (!provider) {
        throw new Error('No provider')
    }

    return new ethers.Contract(
        CurrentConfig.lendingBorrowContract.address,
        // CurrentConfig.lendingBorrowContract.abi,
        '',
        provider
    )
}

export function getLendUserInfo(walletAddress: string): LendUserInfo {
  const lendingBorrowContract = getLendingBorrowContract()
    throw new Error('Not implemented')
}