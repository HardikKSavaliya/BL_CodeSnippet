require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`, // Replace with your Infura project key
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Replace with your wallet private key
    },
  },
};
