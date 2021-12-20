// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TodoSmartContract {
    using Strings for uint256;

    struct STodo {
        uint256 id;
        string title;
        string description;
        uint256 priority;
    }

    struct SResult {
        string message;
    }

    STodo[] todos;
    mapping(uint256 => uint256) todosMap;

    function getTodo(uint256 _id) public view returns(STodo memory) {
        uint256 _index = todosMap[_id];
        return todos[_index];
    }

    function getTodos() public view returns(STodo[] memory) {
        return todos;
    }

    function addTodo(string memory _title, string memory _description, uint256 _priority) public payable returns(SResult memory) {
        STodo memory newTodo;
        uint256 _id = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        todosMap[_id] = todos.length;
        newTodo.id = _id;
        newTodo.title = _title;
        newTodo.description = _description;
        newTodo.priority = _priority;
        todos.push(newTodo);

        SResult memory result;
        result.message = "Todo is added successfully";

        return result;
    }

    function deleteTodo(uint256 _id) public payable returns(SResult memory) {
        uint256 _index = todosMap[_id];
        delete todos[_index];
        delete todosMap[_id];

        SResult memory result;
        result.message = "Todo is deleted successfully";

        return result;
    }

    

    function updateTodo(uint256 _id, string memory _title, string memory _description, uint256 _priority) public payable returns(SResult memory) {
        uint256 _index = todosMap[_id];
        STodo storage _todo = todos[_index];
        _todo.title = _title;
        _todo.description = _description;
        _todo.priority = _priority;

        SResult memory result;
        result.message = "Todo is deleted successfully";

        return result;
    }
}