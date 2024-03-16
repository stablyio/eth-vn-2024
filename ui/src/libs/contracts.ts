import { BigNumber, ethers } from "ethers";

export interface LendUserInfo {
    lastLendInterestShare: BigNumber;
    unRecvInterests: BigNumber;
    currTotalLend: BigNumber;
    userDli: BigNumber;
}

export interface CompoundLendPool {
    token: string;
    spToken: string;
    curSupply: BigNumber;
    curBorrow: BigNumber;
    totalRecvInterests: BigNumber; //User receives interest
}

// export function getLendingBorrowContract(contractAddress: string): ethers.Contract {
//     const provider = getProvider()
//     if (!provider) {
//         throw new Error('No provider')
//     }

//     return new ethers.Contract(
//         contractAddress,
//         // CurrentConfig.lendingBorrowContract.abi,
//         '',
//         provider
//     )
// }

// export function getLendUserInfo(walletAddress: string): LendUserInfo {
//   const lendingBorrowContract = getLendingBorrowContract()
//     throw new Error('Not implemented')
// }