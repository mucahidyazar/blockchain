import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  blockchain: {
    loading: false,
    account: null,
    smartContract: null,
    web3: null,
    errorMsg: '',
  },
  account: {
    loading: false,
    name: '',
    allTokens: [],
    error: false,
    errorMsg: '',
  },
}

export const blockchainReducer = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    connectRequest: state => {
      state.blockchain.loading = true
    },
    connectSuccess: (state, action) => {
      state.blockchain.loading = false
      state.blockchain.account = action.payload.account
      state.blockchain.smartContract = action.payload.smartContract
      state.blockchain.web3 = action.payload.web3
    },
    connectFailed: (state, action) => {
      state.blockchain.loading = false
      state.blockchain.errorMsg = action.payload
    },
    getAccountDataRequest: state => {
      state.account.loading = true
    },
    getAccountDataSuccess: (state, action) => {
      state.account.loading = false
      state.account.name = action.payload.name
      state.account.allTokens = action.payload.allTokens
    },
    getAccountDataFailed: (state, action) => {
      state.account.loading = false
      state.account.error = true
      state.account.errorMsg = action.payload
    },
    updateAccount: (state, action) => {
      state.account.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  connectRequest,
  connectSuccess,
  connectFailed,
  getAccountDataRequest,
  getAccountDataSuccess,
  getAccountDataFailed,
  updateAccount,
} = blockchainReducer.actions

export default blockchainReducer.reducer
