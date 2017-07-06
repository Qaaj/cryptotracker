import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import createStore from './redux'
import io from 'socket.io-client';
// import registerServiceWorker from './registerServiceWorker';


const store = createStore();

window.store = store;

const io_options = {reconnect: true, transports: ['websocket', 'polling']};
const socket = window.io ? window.io(io_options) : io('localhost:3001',io_options);

const workerID = window.workerID;

console.log(workerID);

ReactDOM.render(<Provider store={store}><App worker={workerID} socket={socket}/></Provider>, document.getElementById('root'));
// registerServiceWorker();
