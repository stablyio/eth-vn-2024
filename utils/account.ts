import { ethers } from "ethers";
import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";

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

export function getWallet(
  hre: HardhatRuntimeEnvironment,
): ethers.BaseWallet {
  const { network } = hre;
  const provider = getProvider(hre);
  if (network.name === "localhost") {
    const pk = process.env.PRIVATE_KEY_LOCAL_TEST;
    if (pk && pk !== "") {
      return new ethers.Wallet(pk, provider);
    }
    throw new Error("No private key found for network: " + network.name);
  }

  const mnemonic = getMnemonic(network.name);
  if (!mnemonic || mnemonic === "") {
    throw new Error("No mnemonic found for network: " + network.name);
  }

  return ethers.Wallet.fromPhrase(mnemonic, provider);
}

export function getProvider(
  hre: HardhatRuntimeEnvironment,
): ethers.Provider {
  const { network } = hre;
  if (network.name != "localhost") {
    return new ethers.JsonRpcProvider("http://localhost:8545")
  } else {
    const networkConfig = network.config as HttpNetworkConfig;
    return new ethers.JsonRpcProvider(networkConfig.url);
  }
}