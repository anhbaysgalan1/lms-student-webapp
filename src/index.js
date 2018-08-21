import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
      <div className="wrapper">
        <App />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
