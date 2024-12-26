const bitcoin = require("bitcoinjs-lib");
const crypto = require("crypto");
const { ECPairFactory } = require("ecpair");
const tinysecp = require("tiny-secp256k1");
const axios = require("axios");

// Initialize ECPair
const ECPair = ECPairFactory(tinysecp);

// Step 1: Generate Keys
const keyPair = ECPair.makeRandom();
const privateKey = keyPair.privateKey.toString("hex");
const publicKey = keyPair.publicKey.toString("hex");

console.log("Private Key:", privateKey);
console.log("Public Key:", publicKey);

// Step 2: Create a Transaction (Simplified)
const transactionData = {
  input: "prev_tx_hash:output_index",
  output: "recipient_address",
  amount: 0.01, // BTC
};

// Create a transaction string and hash it
const txString = `${transactionData.input}:${transactionData.output}:${transactionData.amount}`;
const transactionHash = crypto.createHash("sha256").update(txString).digest();

console.log("Transaction Hash (Hex):", transactionHash.toString("hex"));

// Step 3: Sign the Transaction
const signature = keyPair.sign(transactionHash);
console.log("Signature:", signature.toString("hex"));

// Step 4: Verify the Transaction
const isValid = keyPair.verify(transactionHash, signature);
console.log("Is the transaction signature valid?", isValid);

// Step 5: Build the Transaction with TransactionBuilder
const txb = new bitcoin.TransactionBuilder();

// Add input (previous transaction and output index)
txb.addInput(
  transactionData.input.split(":")[0],
  parseInt(transactionData.input.split(":")[1])
);

// Add output (recipient address and amount in satoshis)
txb.addOutput(transactionData.output, Math.floor(transactionData.amount * 1e8)); // 1 BTC = 100,000,000 satoshis

// Sign the transaction
txb.sign(0, keyPair);

// Build the transaction
const tx = txb.build();
const txHex = tx.toHex();
console.log("Signed Transaction Hex:", txHex);

// Step 6: Broadcast the Transaction
const broadcastTransaction = async (txHex) => {
  const url = `https://api.blockcypher.com/v1/btc/main/txs/push`; // BlockCypher API endpoint for Bitcoin Mainnet
  const data = {
    tx: txHex,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Transaction Broadcasted:", response.data);
  } catch (error) {
    console.error(
      "Error broadcasting transaction:",
      error.response ? error.response.data : error.message
    );
  }
};

// Broadcast the transaction
broadcastTransaction(txHex);
