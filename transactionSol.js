const {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} = require("@solana/web3.js");

// Connect to the Solana devnet or mainnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Create a new wallet (keypair)
const senderKeypair = Keypair.generate();
const recipientPublicKey = Keypair.generate().publicKey;

console.log("Sender Public Key:", senderKeypair.publicKey.toBase58());
console.log("Recipient Public Key:", recipientPublicKey.toBase58());

// Convert SOL to lamports for the transaction (1 SOL = 1e9 lamports)
const amountInSOL = 0.01; // 0.01 SOL
const amountInLamports = amountInSOL * LAMPORTS_PER_SOL; // Convert to lamports

console.log(
  `${amountInSOL} SOL is equivalent to ${amountInLamports} lamports.`
);

// Create a transaction to transfer SOL
const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: senderKeypair.publicKey,
    toPubkey: recipientPublicKey,
    lamports: amountInLamports, // Send lamports
  })
);

// Sign and send the transaction
async function sendTransaction() {
  try {
    // Airdrop some SOL to the sender (for testing)
    const airdropSignature = await connection.requestAirdrop(
      senderKeypair.publicKey,
      LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(airdropSignature);

    // Send the transaction
    const txSignature = await connection.sendTransaction(transaction, [
      senderKeypair,
    ]);
    console.log("Transaction sent with signature:", txSignature);

    // Confirm the transaction
    await connection.confirmTransaction(txSignature);
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Error in transaction:", error);
  }
}

// Execute the transaction
sendTransaction();
