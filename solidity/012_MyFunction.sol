// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyFunction {
    uint256 myUint = 42;
    string myString = "Daniel";
    bool myBool = true;
    uint256[] myArr = [3,3,3];
  
    function myPureFunc(uint256 _x, uint256 _y) public pure {
        _x + _y;
    }
  
    function myPureReturnFunc(uint256 _x, uint256 _y) public pure returns(uint256) {
        return _x + _y;
    }
  
    function myPureReturnResultFunc(uint256 _x, uint256 _y) public pure returns(uint256 result) {
        return _x + _y;
    }
  
    function myViewFunc() private view returns(string memory) {
        return myString;
    }
  
    function myUpdateFunc() view public returns(string memory) {
        string memory myNewString = myViewFunc();
        return myNewString;
    }
  
    function myUpdateExternalFunc() external returns(string memory) {
        string memory myNewString = myViewFunc();
        return myNewString;
    }
  
    function myUpdateInternalFunc() internal returns(string memory) {
        string memory myNewString = myViewFunc();
        return myNewString;
    }
  
    function myReturnsFunc() external view returns(uint256, string memory, bool,  uint256[] memory) {
        return (myUint, myString, myBool, myArr);
    }
  
    function myNoReturnsFunc() external {
        myBool = false;
    }
}