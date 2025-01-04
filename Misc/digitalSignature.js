const crypto = require("crypto");

// Simulating a private key and a public key
const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048, // Length of the key in bits
});

// Print private key and public key in PEM format
console.log("Private Key:");
console.log(privateKey.export({ type: "pkcs1", format: "pem" }));

console.log("\nPublic Key:");
console.log(publicKey.export({ type: "pkcs1", format: "pem" }));

// Message to be signed
const message = "Hello, this is a message to be signed.";

// Step 1: Create a digital signature
// Hash the message
const hash = crypto.createHash("sha256").update(message).digest();

// Sign the hash with the private key
const signature = crypto.sign("sha256", hash, privateKey);

console.log("Digital Signature:");
console.log(signature.toString("base64"));

// Step 2: Verify the digital signature
// Verify the signature using the public key
const isVerified = crypto.verify(
  "sha256", // Algorithm used for hashing
  hash, // The hash of the message
  publicKey, // The public key of the signer
  signature // The signature to verify
);

console.log("\nSignature Verified:", isVerified);
