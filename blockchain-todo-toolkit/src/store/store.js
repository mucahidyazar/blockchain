import {configureStore} from '@reduxjs/toolkit'
// import {counterReducer} from './slices/reducers'
import {blockchainReducer} from './blockchain/reducer'

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    blockchain: blockchainReducer,
  },
})
