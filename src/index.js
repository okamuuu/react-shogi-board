import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import Game from './containers/Game'
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <Game />
  </Provider>
  , document.getElementById('root')
);

registerServiceWorker();
