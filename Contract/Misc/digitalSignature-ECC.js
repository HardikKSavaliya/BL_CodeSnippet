const crypto = require("crypto");

// Generate ECC Key Pair (using the 'secp256k1' curve, commonly used in blockchain)
const { privateKey, publicKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "secp256k1", // Standard curve used in Bitcoin and Ethereum
});

// Log the private and public keys (in PEM format)
console.log(
  "Private Key:\n",
  privateKey.export({ type: "pkcs8", format: "pem" })
);
console.log(
  "\nPublic Key:\n",
  publicKey.export({ type: "spki", format: "pem" })
);

// Message to be signed
const message = "Hello, this is a message to be signed using ECC!";

// Step 1: Sign the message with the private key
const signature = crypto.sign("sha256", Buffer.from(message), privateKey);

console.log("\nDigital Signature (Base64):");
console.log(signature.toString("base64"));

// Step 2: Verify the signature using the public key
const isVerified = crypto.verify(
  "sha256", // Hashing algorithm
  Buffer.from(message), // Original message
  publicKey, // Public key
  signature // Signature to verify
);

console.log("\nSignature Verified:", isVerified);
