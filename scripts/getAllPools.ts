import { ethers } from "hardhat";
import { LendingCompound, MyTokenAddress } from "./constants";

// npx hardhat run --network localhost scripts/deployAllContract.ts
async function main() {
  const [signer] = await ethers.getSigners();

  const QuadraticLendCompound = await ethers.getContractAt(
    "QuadraticLendCompound",
    LendingCompound
  );

  const myToken =  await ethers.getContractAt("MyToken", MyTokenAddress);

  await QuadraticLendCompound.userLend(myToken.target, 1);
  const lendUserInfo = await QuadraticLendCompound.lendUserInfos(
    signer.address,
    0
  );
  console.log("lendUserInfo:", lendUserInfo);

  // const QuadraticBorrowCompound = await ethers.getContractAt(
  //   "QuadraticBorrowCompound"
  // );
  // const quadraticBorrowCompound = QuadraticBorrowCompound.connect(signer);
  // const quadraticBorrowCompound = await QuadraticBorrowCompound.deploy();
}

main().catch((error) => {
  console.error("error", error.message);
  process.exitCode = 1;
});
