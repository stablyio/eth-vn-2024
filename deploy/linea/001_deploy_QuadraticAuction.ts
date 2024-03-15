import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { getWallet } from "../../utils/account";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, network } = hre;
  const { deploy } = deployments;

  const wallet = getWallet(network.name);

  const coreDeployed = await deploy("QuadraticAuction", {
    from: wallet.address,
    //gasLimit: 8,
    args: [],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  console.log("Deployed QuadraticAuction:", coreDeployed.address);
  console.log("Recipt:", coreDeployed.receipt);
  
  const proxyDeployed = await deploy("QuadraticAuctionProxy", {
    from: wallet.address,
    //gasLimit: 8,
    args: [coreDeployed.address],
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  console.log("Deployed QuadraticAuctionProxy:", proxyDeployed.address);
};
export default func;
func.tags = ["QuadraticAuction"];
