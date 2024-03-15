import { ethers, providers } from "ethers";

export const ERC20_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export function getErc20Contract(
  address: string,
  provider: providers.Provider
) {
  const currencyContract = new ethers.Contract(address, ERC20_ABI, provider);
  return currencyContract;
}
