export enum Environment {
  LOCAL,
  BETA,
}

export interface NetworkConfig {
  networkName: string;
  chainID: number;
  rpcURL: string;
}

export interface UniswapV3LP {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface ERC20LiquidityAsset {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface LendingBorrowContract {
  lendingContractAddress: string;
  borrowContractAddress: string;
}

export interface PerEnvConfig {
  lendingBorrowContract: LendingBorrowContract;
  lineaNetworkConfig: NetworkConfig;
  uniswapV3LP: UniswapV3LP[];
  erc20LiquidityAssets: ERC20LiquidityAsset[];
}

export interface AppConfig {
  env: Environment;
  wallet: {
    address: string;
    privateKey: string;
  };
  perEnv: Record<Environment, PerEnvConfig>;
}

export const CurrentConfig: AppConfig = {
  env: Environment.LOCAL,
  wallet: {
    address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    privateKey:
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  },

  perEnv: {
    [Environment.LOCAL]: {
      lendingBorrowContract: {
        lendingContractAddress: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        borrowContractAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      },
      lineaNetworkConfig: {
        networkName: "Linea Local",
        chainID: 31337,
        rpcURL: "http://127.0.0.1:8545",
      },
      uniswapV3LP: [
        {
          address: "0x63AF6F0DD26C8ECe6b057c6224762dC7da0B6B04",
          name: "SyncSwap USDT/USDC Classic LP",
          symbol: "USDT/USDC cSLP",
          decimals: 18,
        },
      ],
      erc20LiquidityAssets: [
        {
          address: "0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068",
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
        },
      ],
    },
    [Environment.BETA]: {
      lendingBorrowContract: {
        lendingContractAddress: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        borrowContractAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      },
      lineaNetworkConfig: {
        networkName: "Linea Testnet",
        chainID: 59140,
        rpcURL: "https://linea-goerli.blockpi.network/v1/rpc/public",
      },
      uniswapV3LP: [
        {
          address: "0x63AF6F0DD26C8ECe6b057c6224762dC7da0B6B04",
          name: "SyncSwap USDT/USDC Classic LP",
          symbol: "USDT/USDC cSLP",
          decimals: 6,
        },
      ],
      erc20LiquidityAssets: [
        {
          address: "0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068",
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
        },
      ],
    },
  },
};

export function getCurrentNetworkConfig(): NetworkConfig {
  return CurrentConfig.perEnv[CurrentConfig.env].lineaNetworkConfig;
}

export function getUniswapV3LPList(): UniswapV3LP[] {
  return CurrentConfig.perEnv[CurrentConfig.env].uniswapV3LP;
}

export function getErc20LiquidityAssets(): ERC20LiquidityAsset[] {
  return CurrentConfig.perEnv[CurrentConfig.env].erc20LiquidityAssets;
}

export function getLendingBorrowContract(): LendingBorrowContract {
  return CurrentConfig.perEnv[CurrentConfig.env].lendingBorrowContract;
}
