import { ethers, providers } from "ethers";
// import QuadraticBorrowCompound from "./QuadraticBorrowCompound.json";

export const QuadraticBorrowCompound_ABI = [
  // Read-Only Functions
];

const LendUserInfo = "tuple(uint256 lastLendInterestShare, uint256 unRecvInterests, uint256 currTotalLend, uint256 userDli)"
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
