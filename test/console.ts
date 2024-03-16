import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider("http://localhost:8545")
// const provider = new ethers.JsonRpcProvider("https://rpc.goerli.linea.build");
// const signer = ethers.Wallet.fromPhrase("comic trouble army order height dance cup endorse shaft sing start ten").connect(provider);
const signer = new ethers.Wallet("0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d").connect(provider);
const address = "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0";
const abi = [
  "function addPool(address _token, bool _withUpdate)"
];

async function addPool() {
	const contract = new ethers.Contract(address, abi, signer);   
	const tx = await contract.addPool("0x9A676e781A523b5d0C0e43731313A708CB607508",false, {
        gasLimit: 15000000
    });

	const receipt = await tx.wait();
	console.log("receipt", receipt);
}

addPool();