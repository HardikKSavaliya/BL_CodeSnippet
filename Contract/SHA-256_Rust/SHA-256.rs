use sha2::{Sha256, Digest};

fn main() {
    // Input data
    let input_data = "Hello, Blockchain!";

    // Create a Sha256 object
    let mut hasher = Sha256::new();

    // Update hasher with input data
    hasher.update(input_data);

    // Retrieve the result as a byte array
    let result = hasher.finalize();

    // Convert to a hexadecimal string
    let hash_hex = format!("{:x}", result);

    // Print the input and the hash
    println!("Input Data: {}", input_data);
    println!("SHA-256 Hash: {}", hash_hex);
}
