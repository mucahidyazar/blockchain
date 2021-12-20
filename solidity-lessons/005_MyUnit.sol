// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyUnit {
    //  1 wei ==  1
    //  1 gwei ==  1e9 // 1.000.000.000 wei
    //  1 ether ==  1e18 // 1.000.000.000.000.000.000 wei
    
    uint256 costOfNFT = 0.5 ether; // 500.000.000.000.000.000 wei
    
    // 1 = 1 seconds
    // 1 minutes = 60 seconds
    // 1 hours  = 60 minutes
    // 1 days = 24 hours
    // 1 weeks = 7 days
    uint256 levelUpRate = 1 hours;
}