# Zapper Contracts

Contracts designed to interact with the Beefy Finance protocol and automatically invest in Vaults.

## Technologies and protocols used

This repository uses the following technologies and protocols:
* [Solidity](https://docs.soliditylang.org/en/v0.8.17/)
* [Hardhat](https://hardhat.org/docs)
* [OpenZeppelin](https://docs.openzeppelin.com/)
* [Beefy Finance](https://docs.beefy.finance/)
* [Polygon](https://bscscan.com/)

## Documentation

The information on smart contracts can be found at the following link:
* [Documentation](https://github.com/Ljrr3045/zapper-monorepo/tree/master/packages/zapper-contracts/docs/index.md)

## Useful commands

```
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test (or npx hardhat coverage)

# Run deploy script
npm run contract:deploy

# Generate documentation
npx hardhat docgen
```

## Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
