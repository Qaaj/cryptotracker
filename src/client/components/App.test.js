import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


import configureStore from 'redux-mock-store'

const middlewares = []
const mockStore = configureStore(middlewares)

const initialState = {
    prices: {}
}
const store = mockStore(initialState)

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
});
