import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {LogBox} from 'react-native';
import AppNavigator from './navigation/AppNavigator';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
