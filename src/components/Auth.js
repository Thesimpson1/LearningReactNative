import React from 'react';
import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {log_in_action} from '../redux/actions';
import {useDispatch} from 'react-redux';

const Auth = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.mainStyle}>
      <Text style={styles.textStyle}>Please Login with Google</Text>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        onPress={() => dispatch(log_in_action())}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    alignItems: 'center',
    marginTop: 250,
  },
  textStyle: {
    marginBottom: 50,
    fontSize: 20,
  },
});

export default Auth;
