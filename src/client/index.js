import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux'
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import createStore from './redux'
import 'antd/dist/antd.css'

// import registerServiceWorker from './registerServiceWorker';


const store = createStore();

window.store = store;

ReactDOM.render(
    <LocaleProvider locale={enUS}>
        <Provider store={store}>
            <App />
        </Provider>
    </LocaleProvider>
    , document.getElementById('root'));
// registerServiceWorker();
