require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("solidity-docgen");
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    compilers: [{
      version: "0.7.8"
    },
    {
      version: "0.8.8"
    }]
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.POLYGON_MAINNET_URL,
        blockNumber: 35609317,
      }
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts:{
        mnemonic: process.env.MNEMONIC
      },
    },
  },
  etherscan: {
    apiKey: {
      polygonMainnet: process.env.POLYGONSCAN_API_KEY,
      mumbai: process.env.POLYGONSCAN_API_KEY
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    token: "MATIC",
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
  },
};
