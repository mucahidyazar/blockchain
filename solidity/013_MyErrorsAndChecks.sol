// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyErrorsAndChecks {
  function myPureFunc(uint256 _x, uint256 _y) public pure returns(uint256 xy) {
      // require(condition, message if it is fail why it is fail(its optional argument)
      require(_x < _y, "X is bigger than Y");
      return _x + _y;
  }
  
  function myPureRevertFunc(uint256 _x, uint256 _y) public pure returns(uint256 xy) {
      // logic
      if(_x == 10) {
          revert("X is 10");
      }
      return _x + _y;
  }
  
  uint256 public maxAmount = 100;
  function myAssertFunc(uint256 _x, uint256 _y) public view returns(uint256) {
      checkMax();
      return _x + _y;
  }
  function updateMax() public {
      maxAmount = 50;
  }
  function checkMax() internal view {
      assert(maxAmount == 100);
  }
}