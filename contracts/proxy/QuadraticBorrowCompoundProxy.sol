// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

contract QuadraticBorrowCompoundProxy is TransparentUpgradeableProxy {
    constructor(
        address _contractAddress
    ) TransparentUpgradeableProxy(_contractAddress, msg.sender, "") {}
}
