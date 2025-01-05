// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SolidityTypesDemo {
    // Value Types
    bool public booleanValue = true; // Boolean type
    int256 public integerValue = -123; // Signed integer
    uint256 public unsignedIntegerValue = 123; // Unsigned integer
    address public walletAddress = address(0); // Address type
    bytes1 public singleByte = 0x01; // Fixed-size byte array
    bytes32 public fixedBytes = "Fixed size"; // Fixed-size byte array (32 bytes max)
    string public stringValue = "Hello, Solidity!"; // String

    // Addition
    function Addition(uint a, uint b) external pure returns (uint c) {
        return a + b;
    }

    // Addition with Unchecked to remove overflow checks
    function additionUnchecked(
        uint256 a,
        uint256 b
    ) public pure returns (uint256 c) {
        unchecked {
            c = a + b; // No overflow checks here
        }
        return c;
    }

    // Arrays
    uint256[] public dynamicArray; // Dynamic array
    uint256[3] public fixedArray = [1, 2, 3]; // Fixed-size array

    // Mapping
    mapping(address => uint256) public balances;

    // Struct
    struct Person {
        string name;
        uint256 age;
    }
    Person public person = Person("Alice", 30);

    // Enum
    enum Status {
        Active,
        Inactive,
        Suspended
    }
    Status public currentStatus = Status.Active;

    // Function to modify boolean value
    function toggleBooleanValue() public {
        booleanValue = !booleanValue;
    }

    // Function to update dynamic array
    function addToArray(uint256 _value) public {
        dynamicArray.push(_value);
    }

    // Function to update mapping
    function updateBalance(address _addr, uint256 _amount) public {
        balances[_addr] = _amount;
    }

    // Function to change enum status
    function changeStatus(Status _status) public {
        currentStatus = _status;
    }

    // Storage vs Memory demonstration
    function updateStruct(string memory _newName, uint256 _newAge) public {
        person.name = _newName; // Updates storage
        Person memory tempPerson = person; // Creates a memory copy
        tempPerson.age = _newAge; // Modify memory copy
        // Changes in `tempPerson` won't affect the original `person` struct
    }

    // Pure and View Functions
    function pureFunction(uint256 a, uint256 b) public pure returns (uint256) {
        return a + b; // Pure functions don't read or modify state
    }

    function viewFunction() public view returns (uint256) {
        return unsignedIntegerValue; // View functions only read state
    }
}
