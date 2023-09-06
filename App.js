import {View, Text} from 'react-native';
import React from 'react';
import Main from './src/Main';
import {store} from './src/reduxTK/store/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
};

export default App;
