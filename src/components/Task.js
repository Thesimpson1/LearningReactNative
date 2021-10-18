import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {remove_task_action, update_task_action} from '../redux/actions';
import {launchImageLibrary} from 'react-native-image-picker';

const Task = ({id, title, details, uriImg, checkboxState}) => {
  const dispatch = useDispatch();
  const [editModeTitle, setEditModeTitle] = React.useState(false);
  const [editModeDetails, setEditModeDetails] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDetails, setNewDetails] = React.useState(details);

  return (
    <View style={styles.mainStyle}>
      <View style={styles.taskStyle}>
        <TouchableOpacity
          onPress={() =>
            launchImageLibrary(
              options => {},
              data => {
                dispatch(update_task_action(id, {uriImg: data.assets[0].uri}));
              },
            )
          }>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: uriImg,
            }}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <BouncyCheckbox
            style={styles.bounsyStyle}
            isChecked={checkboxState}
            onPress={() =>
              dispatch(update_task_action(id, {checkboxState: !checkboxState}))
            }
            fillColor="green"
            disableText
          />
          {!editModeTitle ? (
            <Text
              style={!checkboxState ? styles.textStyleOne : styles.textStyleTwo}
              onPress={() => setEditModeTitle(true)}>
              {title}
            </Text>
          ) : (
            <TextInput
              value={newTitle}
              onChangeText={text => setNewTitle(text)}
              style={styles.inputStyles}
              onSubmitEditing={() => {
                dispatch(update_task_action(id, {title: newTitle}));
                setEditModeTitle(false);
              }}
            />
          )}
        </View>
        {!editModeDetails ? (
          <Text style={{fontSize: 12}} onPress={() => setEditModeDetails(true)}>
            {details}
          </Text>
        ) : (
          <TextInput
            value={newDetails}
            onChangeText={text => setNewDetails(text)}
            style={styles.inputStyles}
            onSubmitEditing={() => {
              dispatch(update_task_action(id, {details: newDetails}));
              setEditModeDetails(false);
            }}
          />
        )}
      </View>
      <Button
        title="delete"
        onPress={() => {
          dispatch(remove_task_action(id));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  mainStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgb(0,220,255)',
    borderWidth: 1,
    marginTop: 5,
  },
  bounsyStyle: {
    marginRight: 20,
    fontSize: 10,
  },
  taskStyle: {
    alignItems: 'center',
    marginLeft: 20,
  },
  textStyleOne: {
    marginRight: 10,
    width: 70,
  },
  textStyleTwo: {
    marginRight: 10,
    width: 70,
    textDecorationLine: 'line-through',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginLeft: 20,
  },
  inputStyles: {
    borderWidth: 1,
    marginRight: 10,
    width: 70,
  },
});
export default Task;
