import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";
import "hardhat-laika";
import { getMnemonic } from "./utils/account";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
      {
        version: "0.7.5",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
      {
        version: "0.8.1",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
      {
        version: "0.8.2",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
       {
        version: "0.6.2",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
    ],
  },
  networks: {
    linea_testnet: {
      url: "https://linea-goerli.blockpi.network/v1/rpc/public",
      deploy: ["deploy/linea/"],
      accounts: {
        mnemonic: getMnemonic("linea_testnet"),
      },
    },
  },
};

export default config;
