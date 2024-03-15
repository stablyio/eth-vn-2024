import { ethers } from "ethers";

export function getMnemonic(networkName: string): string {
  const mnemonicKey = "MNEMONIC_" + networkName.toUpperCase();
  const mnemonic = process.env[mnemonicKey];
  if (mnemonic && mnemonic !== "") {
    return mnemonic;
  }
  // Return empty if no mnemonic is found, since we may not be using this mnemonic
  console.log(".env value was empty for: " + mnemonicKey);
  return "";
}

export function getWallet(networkName: string): ethers.BaseWallet {
  if (networkName === "localhost") {
    const pk = process.env.PRIVATE_KEY_LOCAL_TEST;
    if (pk && pk !== "") {
      return new ethers.Wallet(pk);
    }
    throw new Error("No private key found for network: " + networkName);
  }

  const mnemonic = getMnemonic(networkName);
  if (!mnemonic || mnemonic === "") {
    throw new Error("No mnemonic found for network: " + networkName);
  }

  return ethers.Wallet.fromPhrase(mnemonic);
}