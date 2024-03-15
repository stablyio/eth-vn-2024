import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core contract
  const coreDeployed = await deployContract(
    "UniswapV3ChainLinkUsdOracle",
    [],
    undefined,
    hre,
  );

  // Deploy the proxy
  await deployContract(
    "UniswapV3ChainLinkOracleProxy",
    [coreDeployed.address],
    undefined,
    hre,
  );
};
export default func;
func.tags = ["UniswapV3ChainLinkUsdOracle"];
