// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Address Data Type
contract Address {
    // State variable to store an address
    address public owner;

    /// @notice Constructor to set the owner address
    /// @dev Initializes the contract with the deployer's address
    constructor() {
        owner = msg.sender; // msg.sender is the address deploying the contract
    }

    function addressProperties()
        public
        view
        returns (bool isContract, address ownerAddress)
    {
        isContract = owner.code.length > 0; // True if the address is a contract
        // balance = owner.balance; // The balance in wei of the addres
        ownerAddress = owner;
    }

    /// @notice Sends Ether from the contract to a specified address
    /// @param recipient The address to send Ether to
    /// @param amount The amount of Ether to send (in wei)
    function sendEther(address payable recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can send Ether");
        require(
            address(this).balance >= amount,
            string(
                abi.encodePacked(
                    "Insufficient balance in contract: current balance is ",
                    uintToString(owner.balance),
                    " wei"
                )
            )
        );

        // Sending Ether (check result for success)
        (bool success, ) = recipient.call{value: amount}("");
        if (!success) {
            emit TransferFailed(recipient, amount);
            revert("Failed to send Ether");
        }

        emit EtherSent(recipient, amount);
    }

    /// @notice Converts a uint256 to a string
    /// @param value The uint256 value to convert
    /// @return The string representation of the value
    function uintToString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    /// @notice Calls a function on another contract
    /// @param target The contract address
    /// @param data The function call data
    /// @return success Whether the call was successful
    /// @return returnData The data returned by the call
    function callOtherContract(
        address target,
        bytes memory data
    ) public returns (bool success, bytes memory returnData) {
        (success, returnData) = target.call(data); // Low-level call
        if (!success) {
            emit CallFailed(target, data);
        } else {
            emit CallSucceeded(target, returnData);
        }
    }

    /// @notice Example of interacting with another contract using its interface
    /// @param contractAddress The address of the contract
    /// @return version The version string from the called contract
    function interactWithContract(
        address contractAddress
    ) public view returns (string memory version) {
        IVersionedContract versionedContract = IVersionedContract(
            contractAddress
        );
        return versionedContract.getVersion(); // Calls a function in another contract
    }

    /// @notice Fallback function to receive Ether
    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }

    /// @notice Fallback for direct calls without data
    fallback() external payable {
        emit FallbackTriggered(msg.sender, msg.value, msg.data);
    }

    /// @dev Events for tracking transactions and interactions
    event EtherSent(address indexed recipient, uint256 amount);
    event TransferFailed(address indexed recipient, uint256 amount);
    event CallSucceeded(address indexed target, bytes returnData);
    event CallFailed(address indexed target, bytes data);
    event EtherReceived(address indexed sender, uint256 amount);
    event FallbackTriggered(address indexed sender, uint256 amount, bytes data);
}

/// @title Interface for interacting with versioned contracts
interface IVersionedContract {
    function getVersion() external view returns (string memory);
}

/// @title Transfer and Send Demo
contract TransferAndSendDemo {
    address public owner;

    /// @notice Constructor to set the contract owner
    constructor() {
        owner = msg.sender; // Set the deployer as the owner
    }

    /// @notice Sends Ether using `transfer`
    /// @param recipient The address to send Ether to
    /// @param amount The amount of Ether to send (in wei)
    function transferEther(address payable recipient, uint256 amount) public {
        require(msg.sender == owner, "Only the owner can send Ether");
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        // Use `transfer` to send Ether
        recipient.transfer(amount);
    }

    /// @notice Sends Ether using `send`
    /// @param recipient The address to send Ether to
    /// @param amount The amount of Ether to send (in wei)
    /// @return success Whether the `send` operation succeeded
    function sendEther(
        address payable recipient,
        uint256 amount
    ) public returns (bool success) {
        require(msg.sender == owner, "Only the owner can send Ether");
        require(
            address(this).balance >= amount,
            "Insufficient contract balance"
        );

        // Use `send` to send Ether
        success = recipient.send(amount);

        // Log the result
        if (!success) {
            emit SendFailed(recipient, amount);
        } else {
            emit EtherSent(recipient, amount);
        }
    }

    /// @notice Fallback function to receive Ether
    receive() external payable {}

    /// @notice Logs successful Ether transfers
    event EtherSent(address indexed recipient, uint256 amount);

    /// @notice Logs failed `send` operations
    event SendFailed(address indexed recipient, uint256 amount);
}
