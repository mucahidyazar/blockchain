// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LipToken is ERC721, Ownable {
    uint256 COUNTER = 1;
    
    uint256 public fee = 0.001 ether;
    
    struct Lip {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }
    
    Lip[] public lips;
    
    event NewLip(address indexed owner, uint256 id, uint256 dna);
    
    //Helpers
    function _createRandomNumber(uint256 _mod) internal view returns(uint256) {
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    } 
    
    function updateFee(uint256 _newFee) external onlyOwner() {
        fee = _newFee;
    }
    
    function withdraw() external payable onlyOwner() {
        // owner is a functin whic is inside Ownable.sol
        address payable _owner = payable(owner());
        // We wanna transfer balance of this contract to owner of this contract
        // `this` is referance this smart contract
        _owner.transfer(address(this).balance);
    }
    
    constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
    {}
    
    // function mintMyNFT(address _to) public onlyOwner() {
    //     // COUNTER = what is the index or what is the identifier of nft
    //     _safeMint(_to, COUNTER);
    //     COUNTER++;
    // }
    
    /// @notice Creation
    function _createLip(string memory _name) internal {
        uint8 randomRarity = uint8(_createRandomNumber(100));
        uint256 randomDna = _createRandomNumber(10**16);
        Lip memory  newLip = Lip(_name, COUNTER, randomDna, 1, randomRarity);
        lips.push(newLip);
        _safeMint(msg.sender, COUNTER);
        emit NewLip(msg.sender, COUNTER, randomDna);
        COUNTER++;
    }
    
    function createRandomLip(string memory _name) public payable {
        require(msg.value >= fee, "The fee is not correct");
        _createLip(_name);
    }
    
    /// @notice Getters
    function getLips() public view returns(Lip[] memory) {
        return lips;
    }

    function getOwnerLips(address _owner) public view returns(Lip[] memory) {
      // balanceOf ERC721 dan gelen bir method
      // balanceOf token miktarini degilde kac tane LipNFT var onu soyler bize
      Lip[] memory result = new Lip[](balanceOf(_owner));
      uint256 counter = 0;
      for(uint256 i = 1; i < lips.length; i++) {
      // ownerOf ERC721 dan gelen bir method
        if(ownerOf(i) == _owner) {
          result[counter] = lips[i];
          counter++;
        }
      }
      return result;
    }

    // Actions
    function levelUp(uint256 _lipId) public payable {
        require(ownerOf(_lipId) == msg.sender);
        Lip storage lip = lips[_lipId - 1];
        lip.level++;
    }
}