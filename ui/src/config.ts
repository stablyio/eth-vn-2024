export enum Environment {
  LOCAL,
  BETA,
}

export interface NetworkConfig {
  networkName: string;
  chainID: number;
  rpcURL: string;
}

export interface AssetProp {
  address: string;
  symbol: string;
  decimals: number;
  logoName: string;
  lendingPoolId: number;
}

export interface UniswapV3LP {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoName: string;
  lendingPoolId: number;
}

export interface ERC20LiquidityAsset {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  lendingPoolId: number;
  logoName: string;
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
        lendingContractAddress: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
        borrowContractAddress: "0x4A679253410272dd5232B3Ff7cF5dbB88f295319",
      },
      lineaNetworkConfig: {
        networkName: "Linea Local",
        chainID: 31337,
        rpcURL: "http://127.0.0.1:8545",
      },
      uniswapV3LP: [
        {
          address: "0xacfa791c833120c769fd3066c940b7d30cd8bc73",
          name: "Pancake V3 ETH/USDC Positions NFT-LP",
          symbol: "ETH/USDC",
          decimals: 0,
          logoName: "eth",
          lendingPoolId: 1,
        },
        {
          address: "0x998abeb3E57409262aE5b751f60747921B33613E",
          name: "MyToken",
          symbol: "MyToken",
          decimals: 0,
          logoName: "eth",
          lendingPoolId: 1,
        },
      ],
      erc20LiquidityAssets: [
        {
          address: "0x998abeb3E57409262aE5b751f60747921B33613E",
          name: "MyToken",
          symbol: "MyToken",
          decimals: 0,
          logoName: "eth",
          lendingPoolId: 1,
        },
        {
          address: "0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068",
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          lendingPoolId: 2,
          logoName: "usdc",
        },
        {
          address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
          name: "USDT",
          symbol: "USDT",
          decimals: 6,
          lendingPoolId: 3,
          logoName: "usdt",
        },
        {
          address: "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
          name: "DAI",
          symbol: "DAI",
          decimals: 6,
          lendingPoolId: 4,
          logoName: "dai",
        },
        {
          address: "0x0000000000000000000000000000000000000000",
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
          lendingPoolId: 5,
          logoName: "eth",
        },
      ],
    },
    [Environment.BETA]: {
      lendingBorrowContract: {
        lendingContractAddress: "0xf7C03A3f069fAc43AF81aEf3F3D3a69ac1444b68",
        borrowContractAddress: "0x8D136BA56d165473257D366585B41257acD89b3a",
      },
      lineaNetworkConfig: {
        networkName: "Linea Testnet",
        chainID: 59140,
        rpcURL: "https://linea-goerli.blockpi.network/v1/rpc/public",
      },
      uniswapV3LP: [
        {
          address: "0xacfa791c833120c769fd3066c940b7d30cd8bc73",
          name: "Pancake V3 ETH/USDC Positions NFT-LP",
          symbol: "ETH/USDC POS",
          decimals: 0,
          logoName: "eth",
          lendingPoolId: 1,
        },
      ],
      erc20LiquidityAssets: [
        {
          address: "0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068",
          name: "USDC",
          symbol: "USDC",
          decimals: 6,
          lendingPoolId: 2,
          logoName: "usdc",
        },
        {
          address: "0xA219439258ca9da29E9Cc4cE5596924745e12B93",
          name: "USDT",
          symbol: "USDT",
          decimals: 6,
          lendingPoolId: 3,
          logoName: "usdt",
        },
        {
          address: "0x4AF15ec2A0BD43Db75dd04E62FAA3B8EF36b00d5",
          name: "DAI",
          symbol: "DAI",
          decimals: 6,
          lendingPoolId: 4,
          logoName: "dai",
        },
        {
          address: "0x0000000000000000000000000000000000000000",
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
          lendingPoolId: 5,
          logoName: "eth",
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
