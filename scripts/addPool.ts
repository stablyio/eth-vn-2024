import { ethers } from "hardhat";
import {
    MyToken,
  } from "../typechain-types";
import { LendingCompound, MyTokenAddress } from "./constants";

async function main() {
    const [signer, trader] = await ethers.getSigners();

    const myToken = await ethers.getContractAt(
        "MyToken",
        MyTokenAddress
      );

    const lending = await ethers.getContractAt(
        "QuadraticLendCompound",
        LendingCompound
    )

    await lending.addPool(myToken, true)

    const poolLen = await lending.getPoolLength();

    console.log('pool length', poolLen, Number(poolLen));

    const poolInfo = await lending.lendPoolInfo(Number(poolLen) - 1);
    console.log(`poolInfo: ${poolInfo}`)
}

main().catch((error) => {
  console.error("error", error.message, error.stack);
  process.exitCode = 1;
});
