import React from "react";
import {StyleSheet, Button} from "react-native";
import {NavigationContainer,useNavigation} from "@react-navigation/native";
import {Provider} from "react-redux";
import {state} from "./src/redux/stateRedux";
import AppScreen from "./src/screens/AppScreen";
import {createBottomTabNavigator, } from "@react-navigation/bottom-tabs";
import messaging from "@react-native-firebase/messaging";
import UsersScreen from "./src/screens/UsersScreen";
import notifee from '@notifee/react-native';

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
  ? GLOBAL.originalXMLHttpRequest
  : GLOBAL.XMLHttpRequest;
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage);
});
const checkApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    console.log('status',authorizationStatus);
}
const  getMessage = async() => {
    await  messaging().onMessage(remoteMessage =>{
        console.log('foregraund',remoteMessage);
        notifee.displayNotification(remoteMessage);
    })
}
const App = () => {
    React.useEffect(() => {
        checkApplicationPermission();
        getMessage();
    }, [])
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
