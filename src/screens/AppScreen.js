import React from "react";
import {StyleSheet, Text, Button} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MainScreenToDo from "./MainScreenToDo";
import messaging from "@react-native-firebase/messaging";
import UsersScreen from "./UsersScreen";
import {get_user_action, log_out_action} from "../redux/actions";
import {useDispatch, useSelector} from "react-redux";
import Auth from "../components/Auth";


const Tab = createBottomTabNavigator();
const AppScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser.name);
  const userName = useSelector(state => state.auth.userName);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  React.useEffect(() => {
    dispatch(get_user_action());
  }, []);

  const getToken = async() => {
    const token = await  messaging().getToken();
    console.log("token", token)
  }
  React.useEffect(() => {
    getToken()
  }, []);

  return (
    <>
      {isSignedIn ? (
        <Tab.Navigator
          screenOptions={{
            headerRight: () => {
              return (
                <>
                  <Text style={styles.nameStyle}>{currentUser}</Text>
                  <Button
                    title="Logout"
                    color="#00cc00"
                    onPress={() => {
                      dispatch(log_out_action());
                    }}
                  />
                </>
              );
            },
          }}>
          <Tab.Screen name="Home" component={MainScreenToDo} />
          <Tab.Screen name="Request" options={{ headerTitle: userName }} component={UsersScreen} />

        </Tab.Navigator>
      ) : (
        <Auth />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  nameStyle: {
    marginRight: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default AppScreen;
