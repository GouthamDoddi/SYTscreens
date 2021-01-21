import { AppRegistry } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducers from './app/Redux/reducers/index';
import { name as SYTscreens } from './app.json';
import Routes from './app/Route/Routes';

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


export default function App () {
  return (
    <Provider store = { store }>
      <Routes />
    </Provider>
  );
}

AppRegistry.registerComponent(SYTscreens, () => App);
