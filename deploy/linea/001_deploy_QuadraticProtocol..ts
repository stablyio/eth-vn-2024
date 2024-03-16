import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core borrow contract
  const coreBorrowDeployed = await deployContract(
    "QuadraticBorrowCompound",
    [],
    undefined,
    hre,
  );

  // Deploy the proxy
  await deployContract(
    "QuadraticBorrowCompoundProxy",
    [coreBorrowDeployed.address],
    undefined,
    hre,
  );

  // Deploy the core lend contract
  const coreLendDeployed = await deployContract(
    "QuadraticLendCompound",
    [],
    undefined,
    hre,
  );

  // Deploy the proxy
  await deployContract(
    "QuadraticLendCompoundProxy",
    [coreLendDeployed.address],
    undefined,
    hre,
  );
};
export default func;
func.tags = [
  "QuadraticBorrowCompound",
];
