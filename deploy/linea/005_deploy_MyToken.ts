import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { network } = hre;
  if (network.name == "hardhat") {
    // Deploy the core contract
    await deployContract(
      "MyToken",
      [10000000000],
      undefined,
      hre,
    );
  } else {
    console.log("MyToken is not deployed on non-local networks");
  }
};
export default func;
func.tags = ["MyToken"];
