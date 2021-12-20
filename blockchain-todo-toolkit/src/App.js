import './App.css'
import {Counter} from './view/components/Counter/Counter'
import {connect} from './store/blockchain/actions'
import {useSelector, useDispatch} from 'react-redux'

function App() {
  const dispatch = useDispatch()

  return (
    <div className="App">
      {/* <Counter /> */}
      // TODO LIST BOARD
      <div>
        <h1>TODOS</h1>
        <div>
          <input type="text" placeholder="Add todo" />
          <button>Add</button>
        </div>
      </div>
      <button
        onClick={() => {
          console.log('Test')
          dispatch(connect())
        }}
      >
        Connect
      </button>
    </div>
  )
}

export default App
