// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFT {
  string name;
  uint256 dna;

  constructor(string memory _name, uint256 _dna) {
    name = _name;
    dna = _dna;
  }
}

contract MyImportByNFT {
  NFT[] public nfts;
  string myName = "Daniel";
  bytes32 myBytesName = "Daniel";

  function addNft(string memory _name, uint256 _dna) public {
    NFT nft = new NFT(_name, _dna);
    nfts.push(nft);
  }
}