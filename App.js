import React from 'react';
import {StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {state} from './src/redux/stateRedux';
import AppScreen from './src/screens/AppScreen';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={state}>
        <AppScreen />
      </Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
