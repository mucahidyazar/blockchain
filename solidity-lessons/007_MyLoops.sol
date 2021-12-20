// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyLoops {
  function myForLoop() public pure {
      for(uint256 i = 0; i < 5; i++) {
          if(i == 3) {
              break;
          }
          if(i == 2) {
              continue;
          }
      }
  }
  
  function myWhileLoop() public pure {
      uint256 j = 0;
      while(j < 10) {
          // Do any actions
          j++;
      }
  }
}