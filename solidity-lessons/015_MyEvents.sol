// SPDX-Licence-Identifier: MIT
pragma solidity ^0.8.0;

contract MyEvents {
  event CreatedNFT(address indexed user, uint256 id, uint256 dna);
    
  function createNFT(address user, uint256 _id, uint256 _dna) public {
    /// @notice create the nft and save to the storage
    emit CreatedNFT(msg.sender, _id, _dna);
  }
}