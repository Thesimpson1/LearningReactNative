import React from 'react';
import {View, Text, StyleSheet, Button, Image, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {searching_users_action} from '../redux/actions';

const Search = ({}) => {
  const dispatch = useDispatch();
  const [input, setInput] = React.useState('');
  return (
    <View style={styles.mainStyle}>
      <TextInput
        style={styles.input}
        onChangeText={setInput}
        placeholder="Search"
        value={input}
        onSubmitEditing={() => {
          dispatch(searching_users_action(input));
          setInput('');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgb(220,220,220)',
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
  },
});
export default Search;
