import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core contract
  await deployContract(
    "MyToken",
    [10000000000],
    undefined,
    hre,
  );
};
export default func;
func.tags = ["MyToken"];
