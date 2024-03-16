import { ethers, providers } from "ethers";

export const QuadraticBorrowCompound_ABI = [
  // Read-Only Functions
  "function v3NFTBorrow(uint256 pid, uint256 tokenId, uint256 borrowAmount) public",
  "function userReturn(uint256 bid, uint256 repayAmount) public ",
];

const LendUserInfo =
  "tuple(uint256 lastLendInterestShare, uint256 unRecvInterests, uint256 currTotalLend, uint256 userDli)";
export const QuadraticLendingCompound_ABI = [
  // Read-Only Functions
  "function userLend(uint256 _pid, uint256 _amount) public",
  `function lendUserInfos(address, uint256) public view returns (${LendUserInfo})`,
];

export function getQuadraticBorrowCompound(
  address: string,
  provider: providers.Provider
) {
  const currencyContract = new ethers.Contract(
    address,
    QuadraticBorrowCompound_ABI,
    provider
  );
  return currencyContract;
}

export function getQuadraticLendingCompound(
  address: string,
  provider: providers.Provider
) {
  const currencyContract = new ethers.Contract(
    address,
    QuadraticLendingCompound_ABI,
    provider
  );
  return currencyContract;
}
