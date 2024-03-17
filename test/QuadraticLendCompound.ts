import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { ZeroAddress } from "ethers";

describe("QuadraticLendCompound", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploymentFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const borrowContract = await hre.ethers.getContractFactory("QuadraticBorrowCompound");
    const deployedBorrowContract = await borrowContract.deploy();

    const lendContract = await hre.ethers.getContractFactory("QuadraticLendCompound");
    const deployedLendContract = await lendContract.deploy();

    const uniswapV2OracleContract = await hre.ethers.getContractFactory("UniswapV3ChainLinkUsdOracle");
    const deployedUniswapV2OracleContract = await uniswapV2OracleContract.deploy();

    const borrowInit = await deployedBorrowContract.doInitialize(
      ZeroAddress,
      await deployedUniswapV2OracleContract.getAddress(),
      await deployedLendContract.getAddress(),
      ZeroAddress,
      650,
      1000,
    )
    await borrowInit.wait()

    const lendInit = await deployedLendContract.doInitialize(
      await deployedBorrowContract.getAddress(),
      650,
      1000,
    )
    await lendInit.wait()

    const erc20Contract = await hre.ethers.getContractFactory("MyToken");
    const deployedErc20Contract = await erc20Contract.deploy(10000000000);

    return { 
      deployedBorrowContract,
      deployedLendContract,
      deployedErc20Contract,
      owner,
      otherAccount,
    };
  }

  describe("Deployment", function () {
    it("addPool", async function () {
      const {
        deployedLendContract,
        deployedBorrowContract,
        deployedErc20Contract,
      } = await loadFixture(deploymentFixture);

      const erc20Address = await deployedErc20Contract.getAddress()

      const res = await deployedLendContract.addPool(
        erc20Address, 
        false, {
          gasLimit: 15000000
        },
      );

      const tx = await res.getTransaction()
    });
  });
});