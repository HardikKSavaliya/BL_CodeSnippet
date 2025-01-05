// Import the keccak library
const keccak = require("keccak");

// Function to generate a Keccak hash with variable length
function generateKeccakHash(data, outputLength) {
  // Create a SHAKE256 hash object with the desired output length
  const hash = keccak("shake256", { outputLength: outputLength });
  hash.update(data); // Add input data to the hash

  // Get the output as a Buffer and convert to hexadecimal
  const result = hash.read();
  return result.toString("hex");
}

// Example usage
const inputData = "Hardik";
const outputLength = 64; // Output length in bytes (64 bytes = 512 bits)
const hashOutput = generateKeccakHash(inputData, outputLength);

console.log(`Input Data: ${inputData}`);
console.log(`Keccak Hash (${outputLength * 8} bits): ${hashOutput}`);
