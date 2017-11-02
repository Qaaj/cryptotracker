import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import createStore from './redux'
import 'antd/dist/antd.css'
import Immutable from 'seamless-immutable'

// import registerServiceWorker from './registerServiceWorker';
let initialState = {};

if (window.__INITIAL_STATE__) {
  Object.keys(window.__INITIAL_STATE__).forEach(key => {
    initialState[key] = Immutable(window.__INITIAL_STATE__[key]);
  })
}

const store = createStore(initialState);

window.store = store;

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));
// registerServiceWorker();
