// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyHash {
  function myHashedName(string memory _name) public pure returns(bytes32) {
    // return keccak256(abi.encodePacked(_name, "Hello", "More words"));
    return keccak256(abi.encodePacked(_name));
  }
}