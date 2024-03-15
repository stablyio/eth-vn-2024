export enum Environment {
  LOCAL,
  WALLET_EXTENSION,
  PRODUCTION,
}

export interface NetworkConfig {
  networkName: string;
  chainID: number;
  rpcURL: string;
}
export interface AppConfig {
  env: Environment;
  rpc: {
    local: string;
    mainnet: string;
  };
  wallet: {
    address: string;
    privateKey: string;
  };
  lendingBorrowContract: {
    address: string;
  };
  lineaNetworkConfig: NetworkConfig;
}

export const CurrentConfig: AppConfig = {
  env: Environment.LOCAL,
  rpc: {
    local: "http://localhost:8545",
    mainnet: "",
  },
  wallet: {
    address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },
  lendingBorrowContract: {
    address: "",
  },
  lineaNetworkConfig: {
    networkName: "Linea Testnet",
    chainID: 59140,
    rpcURL: "https://linea-goerli.blockpi.network/v1/rpc/public",
  },
};

export function getCurrentNetworkConfig(): NetworkConfig {
    return CurrentConfig.lineaNetworkConfig;
}