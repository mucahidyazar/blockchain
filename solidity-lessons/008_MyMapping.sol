// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyMappings {
  // mapping(key => value)
  mapping(uint256 => address) nfts;
  uint256 counter = 0;
  
  function getOwnerOfNtf(uint256 _id) public view returns(address) {
      return nfts[_id];
  }
  
  function mintNft(address _address) public {
      nfts[counter] = _address;
      counter++;
  }
}