// constants
import Web3 from 'web3'
import TodoSmartContract from '../../contracts/TodoSmartContract.json'

import {
  connectRequest,
  connectSuccess,
  connectFailed,
  getAccountDataRequest,
  getAccountDataSuccess,
  getAccountDataFailed,
  updateAccount,
} from './reducer'
import {store} from '../store'

export const getAccountData = account => {
  return async dispatch => {
    dispatch(getAccountDataRequest())
    try {
      let name = await store
        .getState()
        .blockchain.smartContract.methods.name()
        .call()
      let allTokens = await store
        .getState()
        .blockchain.smartContract.methods.getAllTokens()
        .call()

      dispatch(
        getAccountDataSuccess({
          name,
          allTokens,
        }),
      )
    } catch (err) {
      console.log(err)
      dispatch(getAccountDataFailed('Could not load data from contract.'))
    }
  }
}

export const update = account => {
  return async dispatch => {
    dispatch(updateAccount({account: account}))
    dispatch(getAccountData(account))
  }
}

export const connect = () => {
  return async dispatch => {
    dispatch(connectRequest())
    if (window.ethereum) {
      await window.ethereum.enable()
      let web3 = new Web3(window.ethereum)
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        })
        const networkId = await window.ethereum.request({
          method: 'net_version',
        })
        console.log({networkId})
        // 137 Global Polygon network
        if (networkId === '5777') {
          const SmartContractObj = new web3.eth.Contract(
            TodoSmartContract.abi,
            TodoSmartContract.networks[networkId].address,
          )
          dispatch(
            connectSuccess({
              account: accounts[0],
              smartContract: SmartContractObj,
              web3: web3,
            }),
          )
          // Add listeners start
          window.ethereum.on('accountsChanged', accounts => {
            dispatch(updateAccount(accounts[0]))
          })
          window.ethereum.on('chainChanged', () => {
            window.location.reload()
          })
          // Add listeners end
        } else {
          dispatch(connectFailed('Change network to Polygon.'))
        }
      } catch (err) {
        dispatch(connectFailed('Something went wrong.'))
      }
    } else {
      dispatch(connectFailed('Install Metamask.'))
    }
  }
}
