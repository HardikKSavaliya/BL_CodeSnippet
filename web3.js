// Import Web3
const { Web3 } = require("web3");

// Initialize Web3 with an HTTP provider (e.g., Infura)
const web3 = new Web3(
  "https://mainnet.infura.io/v3/9f01ed6a2d5048d0a55f693871e545d0"
);

// Create an Ethereum account
const account = web3.eth.accounts.create();
console.log("Public Address: ", account.address);
console.log("Private Key: ", account.privateKey);

// Check wallet balance
const checkBalance = async (address) => {
  const balanceWei = await web3.eth.getBalance(address);
  const balanceEther = web3.utils.fromWei(balanceWei, "ether");
  console.log(`Balance of ${address}: ${balanceEther} Ether`);
};

checkBalance(account.address);

// Sending Ether
const sendTransaction = async (fromPrivateKey, toAddress, amountInEther) => {
  const senderAccount = web3.eth.accounts.privateKeyToAccount(fromPrivateKey);
  web3.eth.accounts.wallet.add(senderAccount);

  const tx = {
    from: senderAccount.address,
    to: toAddress,
    value: web3.utils.toWei(amountInEther.toString(), "ether"),
    gas: 21000,
    gasPrice: await web3.eth.getGasPrice(),
  };

  web3.eth
    .sendTransaction(tx)
    .then((receipt) => {
      console.log("Transaction successful: ", receipt);
    })
    .catch((err) => {
      console.error("Transaction failed: ", err);
    });
};

sendTransaction(account.privateKey, "0xRecipientAddress", 0.1);
