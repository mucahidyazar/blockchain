// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyArray {
    uint256[] public array1;
    uint256[] array2 = [3,2,4];
    uint256[5] public array3;
    
    // array1.length; // 0
    // array2.length; // 3
    // array3.length; // 5
    // array2[index]
    // array2[0] // 3
    // array2[1] // 2
    // array2[2] // 4
    
    // array2.push(9)
    // array2.length; // 4
    // array2[3] // 9
    
    // array2.pop()
    // array2.length; // 3
    // array2[2] // 4
    
    // delete array2[2]
    // array2.length; // 2
    
    function getValueOfIndex(uint256 _index) public view returns (uint256) {
        return array2[_index];
    }
    
    function addToArray(uint256 _value) public {
        array2.push(_value);
    }
    
    function deleteFromArray(uint256 _index) public {
        delete array2[_index];
    }
}