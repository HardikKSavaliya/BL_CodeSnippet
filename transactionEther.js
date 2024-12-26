const { ethers } = require("ethers");

// Step 1: Set Up Ethereum Provider
const provider = new ethers.JsonRpcProvider(
  "https://mainnet.infura.io/v3/infura-key"
);

console.log("Connected to Ethereum Mainnet");

// Step 2: Generate or Load Wallet
const wallet = ethers.Wallet.createRandom();
console.log("Address:", wallet.address);
console.log("Private Key:", wallet.privateKey);

// Step 3: Define Transaction
const transaction = {
  to: "0x3aA17100cc3a9CAdD7fa67c48Fcbbd581A1f678A", // Replace with recipient Ethereum address
  value: ethers.parseEther("0.01"), // Amount to send (in Ether)
  gasLimit: 21000, // Gas limit for standard ETH transaction
  gasPrice: ethers.parseUnits("30", "gwei"), // Gas price (in gwei)
  nonce: provider.getTransactionCount(wallet.address, "latest"), // Get nonce for the wallet (this should be the current nonce for the address)
  chainId: 1, // Mainnet (for testnet use 3 for Ropsten, 4 for Rinkeby, etc.)
};

// Step 4: Send Transaction
const sendTransaction = async () => {
  try {
    // Sign the transaction
    const signedTransaction = await wallet.signTransaction(transaction);

    // Send the transaction
    const txResponse = await provider.sendTransaction(signedTransaction);
    console.log("Transaction Hash:", txResponse.hash);

    // Wait for the transaction to be mined
    const receipt = await txResponse.wait();
    console.log("Transaction Mined in Block:", receipt.blockNumber);
    console.log("Transaction Status:", receipt.status ? "Success" : "Failed");
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

// Broadcast the transaction
sendTransaction();

// Step 5: Monitor Transaction
const monitorTransaction = async () => {
  try {
    const receipt = await provider.getTransactionReceipt(transaction.hash);
    console.log("Transaction Status:", receipt.status ? "Success" : "Failed");
  } catch (error) {
    console.error("Error monitoring transaction:", error);
  }
};
