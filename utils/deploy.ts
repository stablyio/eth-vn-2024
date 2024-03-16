import { HardhatRuntimeEnvironment, HttpNetworkConfig } from "hardhat/types";
import { getWallet } from "./account";
import { DeployResult } from "hardhat-deploy/types";
import { ethers } from "hardhat";

export async function deployContract(
  contractName: string,
  contractArgs: any[],
  gasLimit: number | undefined, // undefined means use the default gas limit
  hre: HardhatRuntimeEnvironment,
): Promise<DeployResult> {
  const { deployments } = hre;
  const { deploy } = deployments;

  const wallet = getWallet(hre);

  const deployed = await deploy(contractName, {
    from: wallet.address,
    gasLimit: gasLimit,
    args: contractArgs,
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  console.log("-----------------");
  console.log(`Deployed ${contractName}`);
  console.log("  - Address:", deployed.address);
  console.log("  - From:", deployed.receipt?.from);
  console.log("  - TxHash:", deployed.receipt?.transactionHash);
  console.log("  - GasUsed:", deployed.receipt?.gasUsed.toString());
  console.log("-----------------");

  return deployed;
}