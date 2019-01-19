import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/App';
import * as serviceWorker from './utils/serviceWorker';

import { Provider } from './lib/react-duckx';

import { createStore } from './lib/duckx';
import reducer from './redux'

const store = createStore(reducer)

console.log(store.getState())

window._store = store;

ReactDOM.render(<Provider store={store}><App test='test' /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
