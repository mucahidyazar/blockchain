// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyVariables {
    int8 myInt8 = 127;

    /// @notice Coverts and int8 variable to int256
    int256 public myNewVar = int256(myInt8);
    
    address public myContractAddress = address(this);

    uint256 public myBalanceOfMyContract = myContractAddress.balance;
    
    uint256 number = 20; // state variable
    bool isPaused; // false // state variable
    bool isActiavated = true; // state variable
    
    // view eger herhangi bir stateyi degismiyorsak view ekleyebiliriz ve boylece solidity programlama dili bu fonksiyonun stateyi degismedigini bilir ve daha fazla yorulmaz bu fonksiyon yuzunden.
    function myFunc() public view {
        // uint256 localNumber = 20; // local variable
        // bool localIsPaused; // false // local variable
        // bool localIsActiavated = true; // local variable
    }
    
    /// @notice state variable sabing a global variable
    // block is a global variable, like msg (msg.sender etc...)
    uint256 public time = block.timestamp; // state variable
    address private theSenderAddress = msg.sender;
    uint256 internal gasPrice = tx.gasprice; // gas price of transaction
    address senderOfTransaction = tx.origin; // sender of the transaction (full call chain)
}

// is yapip baska bir contracti yazarsak bu contractimiz is yapilan contractin tu mvariable functionlarini alir.
// yani INeedVariable, MyVariables in tum variable ve functionlarini inheritance olarak alabilir ve kullanabilir
contract INeedVariable is MyVariables {
    uint256 public theAwesomeVar = 100;
    uint256 public theGasPrice = gasPrice;
}