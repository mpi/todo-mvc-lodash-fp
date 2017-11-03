import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'todomvc-app-css/index.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './containers/App';
import app from './reducers';

const store = createStore(app);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
