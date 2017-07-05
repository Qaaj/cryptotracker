import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import createStore from './redux'

const store = createStore();

window.store = store;
const { socket }  = window;

ReactDOM.render(<Provider store={store}><App socket={socket} /></Provider>, document.getElementById('root'));
// registerServiceWorker();
