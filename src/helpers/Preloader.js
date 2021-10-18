import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Preloader = () => {
  return (
    <View>
      <ActivityIndicator size="large" color="rgb(0, 200, 255)" />
    </View>
  );
};
const styles = StyleSheet.create({});
export default Preloader;
