// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyTypes {
    bool booleanOne; // false
    bool myBoolean = true; // true
    
    // 0 - 255 | 2 ** 8(2 * 2 * 2 * 2 * 2 * 2 * 2 * 2) - 1 = 255
    uint8 myUint8 = 255; 
    uint16 myUint16 = 59988;
    uint32 myUint32 = 6756577;
    uint256 myUint256 = 12312412323;
    
    // -127 - 127 | 2 ** 8(2 * 2 * 2 * 2 * 2 * 2 * 2 * 2) - 1 = 255
    int8 myInt8 = 127;
    int8 negativeMyInt8 = -127;
    int16 myInt16 = -29988;
    int32 myInt32 = -6756577;
    int256 myInt256 = -12312412323;
    
    address defaultAddress; // 0x000000000....
    address internal myContractAddress = 0xDA0bab807633f07f013f94DD0E6A4F96F8742B53;
}