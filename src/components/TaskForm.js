import React from 'react';
import {View, Text, StyleSheet, Button, Image, TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import {add_task_action} from '../redux/actions';
import {launchImageLibrary} from 'react-native-image-picker';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [uriImg, setUriImg] = React.useState('');
  const checkboxState = false;

  return (
    <View style={styles.taskView}>
      <Text style={styles.head}>Creating</Text>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: uriImg,
        }}
      />
      <Button
        title="Choose img"
        onPress={() =>
          launchImageLibrary(
            options => {},
            data => {
              setUriImg(data.assets[0].uri);
            },
          )
        }
      />
      <Text style={styles.text}>Title</Text>
      <TextInput
        placeholder="write your title"
        value={title}
        onChangeText={text => setTitle(text)}
        style={styles.inputStyles}
      />
      <Text style={styles.text}>Description</Text>
      <TextInput
        placeholder="write your description"
        value={details}
        onChangeText={text => setDetails(text)}
        style={styles.inputStyles}
      />
      <Button
        title="add"
        onPress={() => {
          dispatch(add_task_action({title, details, uriImg, checkboxState}));
          setTitle('');
          setDetails('');
          setUriImg('');
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  taskView: {
    weight: 100,
    height: 350,
    borderWidth: 1,
    borderRadius: 10,
    margin: 50,
  },
  inputStyles: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  text: {
    marginLeft: 20,
  },
});
export default TaskForm;
