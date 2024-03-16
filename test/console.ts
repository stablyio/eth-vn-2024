import { ethers } from "ethers";

// const provider = new ethers.JsonRpcProvider("http://localhost:8545")
const provider = new ethers.JsonRpcProvider("https://rpc.goerli.linea.build");
const signer = ethers.Wallet.fromPhrase("comic trouble army order height dance cup endorse shaft sing start ten").connect(provider);
// const signer = new ethers.Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80").connect(provider);
const contractAddress = "0x4A67d97D19eD8c0A036c3CEAa4002a86e915e674";
// const contractAddress = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";
const abi = [
  "function addPool(address _token, bool _withUpdate)",
	"function getPoolLength() view returns (uint256 poolLength)"
];

async function addPool() {
	const contract = new ethers.Contract(contractAddress, abi, signer);	

	// const tx = await contract.addPool();

	try {
		// const supplyTokenAddress = "0x84eA74d481Ee0A5332c457a4d796187F6Ba67fEB"
		const supplyTokenAddress = "0xf56dc6695cF1f5c364eDEbC7Dc7077ac9B586068" // testnet USDC
		const tx = await contract.addPool(
			supplyTokenAddress,
			false,
			{
				gasLimit: 15000000
			},
		);
		// const tx = await contract.getPoolLength();

		const receipt = await tx.wait();
		console.log("receipt", receipt);
	} catch (e) {
		console.error("error", e);

		var i = 10
		while (i > 0) {
			console.log(i);
			await new Promise(resolve => setTimeout(resolve, 1000));
			i--;
		}
	}
}

addPool();