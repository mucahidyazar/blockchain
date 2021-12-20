// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyOperators {
    uint8 a = 1;
    uint8 b = 2;
    uint8 c = 3;
    uint8 newValue;
    
    /// @notice Aritmetic Operators ( +, -, *, %, ++, --, **)
    function example1() public {
        a + b * c; // 7
        c % b; // 1
        a++; // 2
        b--; //1
    }
    /// @notice Assignment Operators (=, +=, -=, /=, %=)
    function example2() public {
        newValue = a + b * c;
        a += b * c; // a = a + b * c;
        b *= c; // b = b * c;
    }
    /// @notice Comparision Operators (==, !=, <, <=, >, >=)
    function example3() public view {
        bool result = false;
        if(a == b) {
            result = true;
        }
        if(a != b ) {
            result = true;
        }
        if(a < b) {
            result = true;
        }
        if(a <= b) {
            result = true;
        }
        if(a > b) {
            result = true;
        }
        if(a >= b) {
            result = true;
        }
    }
    /// @notice Logical Operators (!, &&, ||)
    function example4() public view {
        bool result = false;
        // && (and operator)
        if(a == b && b > c) {
            result = true;
        }
        // || (or operator)
        if(a == b || b > c) {
            result = true;
        }
        // ! (if inverse operator, like javascript)
        // bool result = false; // !result // true
        // bool result = true; // !result // false
        if(!result) {
            result = !result;
        }
    }
    /// @notice Conditional Operators (? A:B)
    function example5() public view {
        uint8 result;
        result = a > b ? 100 : 50;
    }
}
