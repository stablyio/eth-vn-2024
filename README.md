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
