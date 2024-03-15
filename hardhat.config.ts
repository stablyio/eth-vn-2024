import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";
import { getMnemonic } from "./utils/account";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
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
