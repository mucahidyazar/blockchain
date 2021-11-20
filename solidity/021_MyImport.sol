// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol";
import "./007_MyLoops.sol";

contract MyImport is ERC721, MyLoops {
  constructor(string memory _name, string memory _symbol) ERC721() {}
}