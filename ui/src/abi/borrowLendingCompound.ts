import { ethers, providers } from "ethers";
// import QuadraticBorrowCompound from "./QuadraticBorrowCompound.json";

export const QuadraticBorrowCompound_ABI = [
  // Read-Only Functions
];

export const QuadraticLendingCompound_ABI = [
  // Read-Only Functions
  "function userLend( uint256 _pid, uint256 _amount) public",
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
