import { ethers, network } from "hardhat";
import {
    MyToken,
  } from "../typechain-types";

export const MyTokenAddress = "0x0165878a594ca255338adfa4d48449f69242eb8f";
export const LendingCompoundProxy = "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82";

async function main() {
    const [signer, trader] = await ethers.getSigners();

    const myToken = await ethers.getContractAt(
        "MyToken",
        MyTokenAddress
      );

    const lending = await ethers.getContractAt(
        "QuadraticLendCompound",
        LendingCompoundProxy
    )

    await lending.addPool(myToken, true)
}

main().catch((error) => {
  console.error("error", error.message, error.stack);
  process.exitCode = 1;
});
