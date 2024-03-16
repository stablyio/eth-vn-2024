import { ethers, providers } from "ethers";
import { getCurrentNetworkConfig } from "@/config";


const browserExtensionProvider = createBrowserExtensionProvider();
let walletExtensionAddress: string | null = null;

// Interfaces

export enum TransactionState {
  Failed = "Failed",
  New = "New",
  Rejected = "Rejected",
  Sending = "Sending",
  Sent = "Sent",
}

export function getProvider(): providers.Provider | null {
  return browserExtensionProvider;
}

export function getWalletAddress(): string | null {
  return walletExtensionAddress;
}

export async function sendTransaction(
  transaction: ethers.providers.TransactionRequest
): Promise<TransactionState> {
  return sendTransactionViaExtension(transaction);
}

export async function connectBrowserExtensionWallet() {
  if (!window.ethereum) {
    return undefined;
  }

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum as any);
  const accounts = await provider.send("eth_requestAccounts", []);

  if (accounts.length == 0) {
    return;
  }

  walletExtensionAddress = accounts[0];
  return walletExtensionAddress;
}

// Internal Functionality

// function createWallet(): ethers.Wallet {
//   let provider = mainnetProvider;
//   if (CurrentConfig.env == Environment.LOCAL) {
//     provider = new ethers.providers.JsonRpcProvider(CurrentConfig.rpc.local);
//   }
//   return new ethers.Wallet(CurrentConfig.wallet.privateKey, provider);
// }

function createBrowserExtensionProvider(): ethers.providers.Web3Provider | null {
  try {
    return new ethers.providers.Web3Provider(window?.ethereum as any, "any");
  } catch (e) {
    console.log("No Wallet Extension Found");
    return null;
  }
}

// Transacting with a wallet extension via a Web3 Provider
async function sendTransactionViaExtension(
  transaction: ethers.providers.TransactionRequest
): Promise<TransactionState> {
  try {
    const receipt = await browserExtensionProvider?.send(
      "eth_sendTransaction",
      [transaction]
    );
    console.log('receipt', receipt)
    if (receipt) {
      return TransactionState.Sent;
    } else {
      return TransactionState.Failed;
    }
  } catch (e) {
    console.log(e);
    return TransactionState.Rejected;
  }
}

// async function sendTransactionViaWallet(
//   transaction: ethers.providers.TransactionRequest
// ): Promise<TransactionState> {
//   if (transaction.value) {
//     transaction.value = BigNumber.from(transaction.value);
//   }
//   const txRes = await wallet.sendTransaction(transaction);

//   let receipt = null;
//   const provider = getProvider();
//   if (!provider) {
//     return TransactionState.Failed;
//   }

//   while (receipt === null) {
//     try {
//       receipt = await provider.getTransactionReceipt(txRes.hash);

//       if (receipt === null) {
//         continue;
//       }
//     } catch (e) {
//       console.log(`Receipt error:`, e);
//       break;
//     }
//   }

//   // Transaction was successful if status === 1
//   if (receipt) {
//     return TransactionState.Sent;
//   } else {
//     return TransactionState.Failed;
//   }
// }

export async function walletSwitchToLineaNetwork() {
  const chainIDHex = ethers.utils.hexlify(getCurrentNetworkConfig().chainID);
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chainIDHex }],
    });
  } catch (err) {
    // This error code indicates that the chain has not been added to MetaMask
    if (err.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: getCurrentNetworkConfig().networkName,
            chainId: chainIDHex,
            nativeCurrency: { name: "ETH", decimals: 18, symbol: "ETH" },
            rpcUrls: [getCurrentNetworkConfig().rpcURL],
          },
        ],
      });
    }
  }
}

export async function walletGetChainID(): Promise<number> {
  const chainID = await window.ethereum.request({
    "method": "eth_chainId",
    "params": []
  });

  return Number(chainID);
}