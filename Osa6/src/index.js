import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
    const good = () => {
        store.dispatch({type: 'GOOD'})
    }

    const ok = () => {
        store.dispatch({type: 'OK'})
    }

    const bad = () => {
        store.dispatch({type: 'BAD'})
    }

    const zero = () => {
        store.dispatch({type: 'ZERO'})
    }

    return (
        <div>
            <button onClick={good} > hyvä </button>
            <button onClick={ok} > ok </button>
            <button onClick={bad} > huono </button>
            <button onClick={zero} > nollaa </button>
            <p>hyvä {store.getState().good}</p>
            <p>ok {store.getState().ok}</p>
            <p>huono {store.getState().bad}</p> 
        </div>
    )

}

const renderApp = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  }
  
  renderApp()
  store.subscribe(renderApp)