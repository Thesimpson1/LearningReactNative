import React from 'react';
import {StyleSheet, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {state} from './src/redux/stateRedux';
import AppScreen from './src/screens/AppScreen';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import messaging from "@react-native-firebase/messaging";

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
});

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
