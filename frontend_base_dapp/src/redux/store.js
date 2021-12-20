import {applyMiddleware, compose, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import blockchainReducer from './blockchain/blockchainReducer'
import dataReducer from './data/dataReducer'

const rootReducer = combineReducers({
  blockchain: blockchainReducer,
  data: dataReducer,
})

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = () => {
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
  )
}

const store = configureStore()

export default store
