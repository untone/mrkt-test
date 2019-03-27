import React from 'react';
import { Provider, connect } from 'react-redux';

import store from './store';

import './App.scss';
import Signin from './Signin';

const ConnectedSignin = connect(state => {
  return state;
})(Signin);

export default function App() {
  return (
    <div className='app'>
      <div className='appContainer'>
        <Provider store={store}>
          <ConnectedSignin/>
        </Provider>
      </div>
    </div>
  )
};
