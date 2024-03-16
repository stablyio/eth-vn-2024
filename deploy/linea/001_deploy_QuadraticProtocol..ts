import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { deployContract } from "../../utils/deploy";
import { getWallet } from "../../utils/account";
import { ZeroAddress, ethers } from "ethers";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // Deploy the core contracts
  const borrowDeployed = await deployContract(
    "QuadraticBorrowCompound",
    [],
    undefined,
    hre,
  );
  const lendDeployed = await deployContract(
    "QuadraticLendCompound",
    [],
    undefined,
    hre,
  );
  const uniswapV2OracleDeployed = await deployContract(
    "UniswapV3ChainLinkUsdOracle",
    [],
    undefined,
    hre,
  );

  // Initialize the core contracts
  const borrowContract = await hre.ethers.getContractAt(
    "QuadraticBorrowCompound",
    borrowDeployed.address,
    getWallet(hre),
  );
  const lendContract = await hre.ethers.getContractAt(
    "QuadraticLendCompound",
    lendDeployed.address,
    getWallet(hre),
  );

  await borrowContract.doInitialize(
    ZeroAddress,
    uniswapV2OracleDeployed.address,
    lendDeployed.address,
    ZeroAddress,
    650,
    1000,
  )
  await lendContract.doInitialize(
    borrowDeployed.address,
    650,
    1000,
  )

  // Deploy the proxies
  await deployContract(
    "QuadraticBorrowCompoundProxy",
    [borrowDeployed.address],
    undefined,
    hre,
  );
  await deployContract(
    "QuadraticLendCompoundProxy",
    [lendDeployed.address],
    undefined,
    hre,
  );
  await deployContract(
    "UniswapV3ChainLinkOracleProxy",
    [uniswapV2OracleDeployed.address],
    undefined,
    hre,
  );
};
export default func;
func.tags = [
  "QuadraticBorrowCompound",
  "QuadraticLendCompound",
  "UniswapV3ChainLinkUsdOracle",
];
