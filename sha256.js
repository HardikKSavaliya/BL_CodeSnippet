// Import the crypto module
const crypto = require("crypto");

// Function to generate a SHA-256 hash
function generateSHA256Hash(data) {
  // Create a hash object, update it with data, and convert it to a hexadecimal string
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
}

// Example usage
const inputData = "Hardik";
const hashOutput = generateSHA256Hash(inputData);

console.log(`Input Data: ${inputData}`);
console.log(`SHA-256 Hash: ${hashOutput}`);
