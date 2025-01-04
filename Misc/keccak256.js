// Import the keccak library
const keccak256 = require("keccak");

// Function to generate a Keccak-256 hash
function generateKeccak256Hash(data) {
  // Create a hash object, update it with data, and get the hash in hexadecimal format
  const hash = keccak256("keccak256").update(data).digest("hex");
  return hash;
}

// Example usage
const inputData = "Hardik";
const hashOutput = generateKeccak256Hash(inputData);

console.log(`Input Data: ${inputData}`);
console.log(`Keccak-256 Hash: ${hashOutput}`);
