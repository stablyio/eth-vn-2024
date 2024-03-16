import { ethers } from "hardhat";

// npx hardhat run --network localhost scripts/deployToken.ts
async function main() {
    const [ signer ] = await ethers.getSigners();

    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy(10000000000);
    console.log('myToken:', myToken.target);

    await myToken.mint(signer.address, 1000000000); 
}

main().catch((error) => {
    console.error('error', error.message);
    process.exitCode = 1;
});