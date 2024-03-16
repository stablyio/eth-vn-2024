import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core contract
  const coreDeployed = await deployContract(
    "QuadraticBorrowCompound",
    [],
    undefined,
    hre,
  );

  // Deploy the proxy
  await deployContract(
    "QuadraticBorrowCompoundProxy",
    [coreDeployed.address],
    undefined,
    hre,
  );
};
export default func;
func.tags = ["QuadraticBorrowCompound"];
