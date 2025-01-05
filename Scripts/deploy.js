const { ethers } = require("hardhat");

async function main() {
  const MyContract = await ethers.getContractFactory("SolidityTypesDemo");
  const myContract = await MyContract.deploy("Hello, Sepolia!");

  await myContract.deployed();

  console.log("Contract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
