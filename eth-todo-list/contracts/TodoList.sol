pragma solidity ^0.5.0;

contract TodoList {
  uint public taskCount = 0; //okumak icin baska yerlerden public yapiyoruz //uint ise state gibi

  struct Task {
    uint id;
    string content;
    bool completed;
  }

  mapping(uint => Task) public tasks;

  event TaskCreated(
    uint id,
    string content,
    bool completed
  );
  event TaskToggle(
    uint id,
    bool completed
  );

  constructor() public {
    //createTask creates default task when we visit first time
    createTask("Check out dappuniversity.com");
  }

  function createTask(string memory _content) public {
    taskCount ++;
    tasks[taskCount] = Task(taskCount, _content, false);
    emit TaskCreated(taskCount, _content, false);
  }

  function toggleCompleted(uint _id) public {
    Task memory _task = tasks[_id];

    _task.completed = !_task.completed;
    tasks[_id] = _task;
    emit TaskToggle(_id, _task.completed);
  }
}


    function getGreeting() public constant returns (string) {
        return greeting;
    }

    function getStructureGreetingsJustOwner(uint idx) public constant returns (string, address) {
        require(owner == msg.sender);
        // if (owner != msg.sender) {
        //     throw ;
        // }
        
        return (structGreetings[idx].message, structGreetings[idx].owner);
    }