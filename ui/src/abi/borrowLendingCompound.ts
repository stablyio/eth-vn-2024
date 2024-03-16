import { ethers, providers } from "ethers";
import QuadraticBorrowCompound from "./QuadraticBorrowCompound.json";

export function getErc20Contract(
    address: string,
    provider: providers.Provider
  ) {
    const currencyContract = new ethers.Contract(address, QuadraticBorrowCompound, provider);
    return currencyContract;
  }
  