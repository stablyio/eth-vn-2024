import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export const QuadraticAuctionProxy = buildModule("QuadraticAuctionProxy", (m) => {
  const contract1 = m.contract("QuadraticAuction", []);
  const contract2 = m.contract("QuadraticAuctionProxy", []);
  return {};
});

export default QuadraticAuctionProxy;
