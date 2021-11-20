// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyStructs {
    struct NFT {
        string name;
        uint256 dna;
    }
    
    // mapping(uint256 => NFT) nftMapping;
    NFT[] public nftList; // storage location
    
    function addNFT(string memory _name, uint256 _dna) public {
        NFT memory newNFT;
        newNFT.name =  _name;
        newNFT.dna = _dna;
        
        nftList.push(newNFT);
    }
    
    function getNFT(uint256 _index) public view returns(NFT memory) {
        return nftList[_index];
    }
    
    function getNFTName(uint256 _index) public view returns(string memory) {
        return nftList[_index].name;
    }
    
    function addNFTByQuickWay(string memory _name, uint256 _dna) public {
        NFT memory newNFT = NFT(_name, _dna); // This order depends the order of struct
        
        nftList.push(newNFT);
    }
    
    function updateNFTByStorage(uint256 _index, string memory _name, uint256 _dna) public {
        NFT storage nftToBeUpdated = nftList[_index];
        nftToBeUpdated.name = _name;
        nftToBeUpdated.dna = _dna;
    }
    
    function updateNFTByMemory(uint256 _index, string memory _name, uint256 _dna) public {
        NFT memory nftToBeUpdated = nftList[_index];
        nftToBeUpdated.name = _name;
        nftToBeUpdated.dna = _dna;
        nftList[_index] = nftToBeUpdated;
    }
    
    function addNFTs(NFT[] calldata _nfts) public {
        nftList = _nfts;
    }
}