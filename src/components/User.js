import React from 'react';

import {View, Text, StyleSheet, Button, Image} from 'react-native';
import {useDispatch} from 'react-redux';

const User = ({login, id, gitHub, avatar}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.mainStyle}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: avatar,
        }}
      />
      <View>
        <Text>{login}</Text>
        <Text>{gitHub}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(0,220,255)',
    borderWidth: 1,
    marginTop: 5,
  },
  taskStyle: {
    alignItems: 'center',
  },
  completeStyle: {
    textDecorationLine: 'line-through',
    alignSelf: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
});
export default User;
