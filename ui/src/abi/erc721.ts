import { ethers, providers } from "ethers";

export const ERC721_ABI = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",

  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",

  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)",
];

export function getErc721Contract(
  address: string,
  provider: providers.Provider
) {
  const currencyContract = new ethers.Contract(address, ERC721_ABI, provider);
  return currencyContract;
}
