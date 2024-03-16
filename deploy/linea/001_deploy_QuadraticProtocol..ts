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
  console.log("---------------------------------");
  console.log("Initializing QuadraticBorrowCompound");
  const borrowContract = await hre.ethers.getContractAt(
    "QuadraticBorrowCompound",
    borrowDeployed.address,
  );
  const borrowInit = await borrowContract.doInitialize(
    ZeroAddress,
    uniswapV2OracleDeployed.address,
    lendDeployed.address,
    ZeroAddress,
    650,
    1000,
  )
  const borrowInitRes = await borrowInit.wait()
  console.log("  - Hash:", borrowInitRes?.hash);
  console.log("  - GasUsed:", borrowInitRes?.gasUsed.toString());
  console.log("---------------------------------");

  console.log("---------------------------------");
  console.log("Initializing QuadraticLendCompound");
  const lendContract = await hre.ethers.getContractAt(
    "QuadraticLendCompound",
    lendDeployed.address,
  );
  const lendInit = await lendContract.doInitialize(
    borrowDeployed.address,
    650,
    1000,
  )
  const lendInitRes = await lendInit.wait()
  console.log("  - Hash:", lendInitRes?.hash);
  console.log("  - GasUsed:", lendInitRes?.gasUsed.toString());
  console.log("---------------------------------");

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
