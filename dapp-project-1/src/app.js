const Web3 = require('web3')
const rpcURL = 'http://127.0.0.1:7545'

const web3 = new Web3(rpcURL)

web3.eth.getBlockNumber().then(console.log)

const address = '0xc9144976353bC2927Fd452039C570bE44C793a88'

web3.eth.getBalance(address).then(balance => {
  // by wei
  console.log(`Balance of ${address} is ${balance} wei`)
  // by gwei
  console.log(
    `Balance of ${address} is ${web3.utils.fromWei(balance, 'gwei')} gwei`,
  )
  // by ether
  console.log(
    `Balance of ${address} is ${web3.utils.fromWei(balance, 'ether')} ether`,
  )
})
