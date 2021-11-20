// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// This is a comment line
/*
    This is a comment block
*/

// A smart contract is an address like meta mask wallet ids ex: 0x8892b0ae6152bcF3C6787e8F1e8BDfe9a8BFa7ba
// AContract and BContract can comminicate together
contract AContract {}
contract BContract {}

/// NatSpec Single line comments
/**
    NatSpec Multi-line comments
*/

/// @title My Frist Smart Contract which name is MyContract
/// @author Mucahid Yazar
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
contract MyFirstContract {
    string public name = "Mucahid";
    string private lastname = "Yazar";
    string internal job = "Engineer";
    
    /// @notice This function changes the name
    function changeName(string memory newName) public {
        name = newName;
    }
    
    /// @notice This function returns the name
    function getName() public returns (string memory) {
        return name;
    }
}