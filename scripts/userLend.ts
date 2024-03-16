import { ethers } from "hardhat";
import { LendingCompound, MyTokenAddress } from "./constants";

// npx hardhat run --network localhost scripts/userLend.ts
async function main() {
  const [signer] = await ethers.getSigners();

  const QuadraticLendCompound = await ethers.getContractAt(
    "QuadraticLendCompound",
    LendingCompound,
    signer
  );

  const myToken =  await ethers.getContractAt("MyToken", MyTokenAddress);

  const myTokenApproval = await myToken.approve(
    QuadraticLendCompound.target,
    ethers.MaxUint256
  );
  await myTokenApproval.wait();

  await QuadraticLendCompound.userLend(1, 10000);
  const lendUserInfo = await QuadraticLendCompound.lendUserInfos(
    signer.address,
    1
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
