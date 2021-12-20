// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyPayable {
    address payable public myAddress;
    
    constructor() payable {
        myAddress = payable(msg.sender);
    }
    
    function deposit(uint256 _amount) public {
        payable(msg.sender).transfer(_amount);
    }
    
    function depositAsPayable(uint256 _amount) public payable {}
    
    function getThisContractsBalance() public view returns(uint256) {
        uint256 amount = address(this).balance;
        return amount;
    }
    
    
    
    // HOW WE CAN ACCPT ETHER IN A SMART CONTRACT
    // fallbackde recive de gas calistirmasi limitlendirilmistir yani major buyuk islemler yapamayuiz bunalrin iclerinde
    /// @notice birisi bir data body olmadan bir transaction yaptiginda receive function kullanilmali
    /// @notice eexternal receive ile birlikte her zaman cagrilip kullanilmali
    receive() external payable {
        
    }
    
    /// @notice eger data belirtilmisse fallback kullanilir
    fallback() external payable {
        
    }
    
    // HOW WE CAN SEND ETHER
    // WAY 1;
    function transferEther(address payable _user) public payable {
        _user.transfer(msg.value);
    }
    // WAY TO  THE CONTRACT;
    function transferToContract() public payable {
        payable(this).transfer(msg.value);
    }
    // WAY 2;
    function transferEtherByTwo(address payable _user) public payable {
        bool didSend = _user.send(msg.value);
        require(didSend, "This failed to send!");
    }
    // WAY 3 PREFERED WAY;
    function transferEtherByCall(address payable _user) public payable {
        (bool didSend, bytes memory data) = _user.call{value: msg.value}("");
        require(didSend, "This failed to send!");
    }
}