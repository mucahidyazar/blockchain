const App = {
  loading: false,
  contracts: {},
  todoList: {},
  load: async () => {
    // Load app...
    console.log('app loading...')
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },
  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({
          /* ... */
        })
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({
        /* ... */
      })
    }
    // Non-dapp browsers...
    else {
      console.log(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  },
  loadAccount: async () => {
    App.accounts = await ethereum.send('eth_requestAccounts')
    App.account = App.accounts.result[0]
    console.log(App.accounts.result[0])
  },

  loadContract: async () => {
    const todoList = await (await fetch('TodoList.json')).json()

    App.contracts.TodoList = await TruffleContract(todoList)
    App.contracts.TodoList.setProvider(
      new Web3.providers.HttpProvider('http://127.0.0.1:7545'),
    )

    App.todoList = await App.contracts.TodoList.deployed()
  },

  render: async () => {
    if (App.loading) {
      return
    }
    App.setLoading(true)
    document.getElementById('account').textContent = App.account
    console.log(document.getElementById('account').textContent)

    await App.renderTasks()

    App.setLoading(false)
  },

  renderTasks: async () => {
    // Load the total task count from the blockchain
    const taskCount = await App.todoList.taskCount()
    const taskTemplate = document.querySelector('.taskTemplate')

    //render out each task with a new task template
    for (let i = 1; i <= taskCount; i++) {
      const task = await App.todoList.tasks(i)
      console.log(task)
      const taskId = task[0].toNumber()
      const taskContent = task[1]
      const taskCompleted = task[2]

      // Create the html for the task
      const newTaskTemplate = taskTemplate.cloneNode(true)
      newTaskTemplate.style.display = 'block'
      newTaskTemplate.querySelector('.content').textContent = taskContent
      newTaskTemplate.querySelector('.input').setAttribute('name', taskId)

      newTaskTemplate.addEventListener('click', e => {
        const name = e.target.getAttribute('name')
        console.log({name})
        if (name) {
          App.toggleCompleted(name)
        }
      })
      if (App.toggleCompleted) {
        // newTaskTemplate.getElementById('newTask').click()
      }

      //put the task in the correct list
      if (taskCompleted) {
        newTaskTemplate.querySelector('.input').setAttribute('checked', true)
        document.getElementById('completedTaskList').append(newTaskTemplate)
      } else {
        document.getElementById('taskList').append(newTaskTemplate)
      }
    }

    document.querySelectorAll('.taskTemplate').forEach(el => {
      el.ad
    })

    // Show the tasks
  },

  createTask: async () => {
    App.setLoading(true)
    const content = document.getElementById('newTask').value
    console.log(content)
    await App.todoList.createTask(content, {from: App.account})
    window.location.reload()
  },

  toggleCompleted: async e => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.todoList.toggleCompleted(taskId)
    window.location.reload()
  },

  setLoading: boolean => {
    App.loading = boolean
    const loader = document.getElementById('loader')
    const content = document.getElementById('content')
    if (boolean) {
      loader.style.display = 'block'
      content.style.display = 'none'
    } else {
      loader.style.display = 'none'
      content.style.display = 'block'
    }
  },
}

window.addEventListener('load', () => {
  App.load()
})
