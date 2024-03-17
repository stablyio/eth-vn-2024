# Quadratic Protocol

## Setup

```bash
make install
```

## Linting

```bash
make lint
```

## Deployment

### Local network

Run the local network:

```bash
make run.local-node
```

Deploy the contract to the local network:

```bash
make deploy-contract.local
```

If you want to re-deploy the contract, you need to reset the deployment:

```bash
make deploy-contract.reset network=localhost
```

### Testnet

Deploy the contract to the Linea testnet:

```bash
make deploy-contract.linea.testnet
```

If you want to re-deploy the contract, you need to reset the deployment:

```bash
make deploy-contract.reset network=linea_testnet
```

## Debug tutorial

We can import `hardhat/console.sol` to the contract to log messages to the console. For example, the following contract logs a message when the `set` function is called:

```solidity
import "hardhat/console.sol";

contract Lock {
    uint256 public value;

    function set(uint256 _value) public {
        console.log("Setting value to", _value);
        value = _value;
    }
}
```

The log message will be showed in the local network console.

After adding the log messages, we can run the local node (check the Deployment section) and run a script to call the `set` function:

```typescript
import hre from "hardhat";

async function main() {
  const contract = await hre.ethers.getContractFactory("QuadraticLendCompound");
  const deployedContract = await contract.deploy(arg1, arg2, ...);

  const res = await deployedContract.set(
    20, // _value
    {
      gasLimit: 15000000
    },
  );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

## Deployed contracts

### Linea testnet

| Contract                      | Address                                    |
| ----------------------------- | ------------------------------------------ |
| QuadraticBorrowCompound       | 0x25Eb3358553fBfef30d37Cd943688e9315A4Ae89 |
| QuadraticLendCompound         | 0x9B6C05a91C1A8A768ED5cEE1B28CcDe28b0B1CcC |
| UniswapV3ChainLinkUsdOracle   | 0x20CFe720Dd5Ca56DB08FE3f8c80c46667C36a144 |
| QuadraticBorrowCompoundProxy  | 0xC95B04023C426143174998a339Cdcd0A283C9c82 |
| QuadraticLendCompoundProxy    | 0x6aA11c2ab021C4509244e3A3F07f7859986c0C1e |
| UniswapV3ChainLinkOracleProxy | 0x51EFDFCbd095902B2A0F5811F3ff114EdDf003F9 |

### Polygon ZK Cardona testnet

Table:

| Contract                      | Address                                    |
| ----------------------------- | ------------------------------------------ |
| QuadraticBorrowCompound       | 0x239f947c98bC90247d63ACF66EDbba65d200b122 |
| QuadraticLendCompound         | 0x6edB4eE4484D9B11D95270dfF88aCe5E85a83139 |
| UniswapV3ChainLinkUsdOracle   | 0x32C497C9F8A60076209dfa21e50A5A9477FA66f1 |
| QuadraticBorrowCompoundProxy  | 0x8D136BA56d165473257D366585B41257acD89b3a |
| QuadraticLendCompoundProxy    | 0x7BbE2Fa47d999F240540ba54C5f587409098924d |
| UniswapV3ChainLinkOracleProxy | 0xf7C03A3f069fAc43AF81aEf3F3D3a69ac1444b68 |

## Solidity Scan result

- https://solidityscan.com/projects/202f29a3ad857d3d62117784e4eff555/46a0a7b5e0682bb4
- Report: https://solidityscan.com/report/project/202f29a3ad857d3d62117784e4eff555/d3736b6c6aab34ae