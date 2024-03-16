import { ethers, network } from "hardhat";

// npx hardhat run --network localhost scripts/deployAllContract.ts
async function main() {
    const [ signer ] = await ethers.getSigners();

    const QuadraticLendCompound = await ethers.getContractFactory("QuadraticLendCompound");
    const quadraticLendCompound = await QuadraticLendCompound.deploy();
    console.log('QuadraticLendCompound:', quadraticLendCompound.target);

    const QuadraticBorrowCompound = await ethers.getContractFactory("QuadraticBorrowCompound");
    const quadraticBorrowCompound = await QuadraticBorrowCompound.deploy();
    console.log('quadraticBorrowCompound: ', quadraticBorrowCompound.target);

    await quadraticLendCompound.doInitialize(quadraticBorrowCompound.target, 100, 100);
}

main().catch((error) => {
    console.error('error', error.message);
    process.exitCode = 1;
});