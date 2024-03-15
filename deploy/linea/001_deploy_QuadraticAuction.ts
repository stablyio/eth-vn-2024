import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getWallet } from "../../utils/account";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core contract
  const coreDeployed = await deployContract(
    "QuadraticAuction",
    [],
    undefined,
    hre,
  );

  // Deploy the proxy
  await deployContract(
    "QuadraticAuctionProxy",
    [coreDeployed.address],
    undefined,
    hre,
  );
};
export default func;
func.tags = ["QuadraticAuction"];
