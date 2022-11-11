import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Game from './components/Game'
import './styles/main.css';
import reducer from './reducers/reducers'


const store = createStore(
        reducer, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);
