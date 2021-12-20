// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyInheritance_A {
    string internal name = "Hashlips";
}

contract MyInheritance_B is MyInheritance_A {
    function getName() public view virtual returns(string memory) {
        return name;
    }
}

contract MyInheritance_D {}

contract MyInheritance_C is MyInheritance_B, MyInheritance_D {
    function getName() public view virtual override returns(string memory) {
        return "Unknown name";
    }
}