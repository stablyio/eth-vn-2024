import { HardhatRuntimeEnvironment } from "hardhat/types";
import { getWallet } from "./account";
import { DeployResult } from "hardhat-deploy/types";

export async function deployContract(
  contractName: string,
  contractArgs: any[],
  gasLimit: number | undefined, // undefined means use the default gas limit
  hre: HardhatRuntimeEnvironment,
): Promise<DeployResult> {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const wallet = getWallet(network.name);

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