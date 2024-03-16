import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("QuadraticLendCompound", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploymentFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const contract = await hre.ethers.getContractFactory("QuadraticLendCompound");
    const deployedContract = await contract.deploy();

    const erc20Contract = await hre.ethers.getContractFactory("MyToken");
    const deployedErc20Contract = await erc20Contract.deploy(10000000000);

    return { deployedContract, deployedErc20Contract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("addPool", async function () {
      const { deployedContract, deployedErc20Contract } = await loadFixture(deploymentFixture);

      const erc20Address = await deployedErc20Contract.getAddress()

      const res = await deployedContract.addPool(
        erc20Address, 
        false, {
          gasLimit: 15000000
        },
      );

      const tx = await res.getTransaction()
    });
  });
});