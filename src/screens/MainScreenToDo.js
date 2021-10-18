import React from 'react';
import {Text, StyleSheet, SafeAreaView, View, Dimensions} from 'react-native';
import {load_task_action, remove_task_action} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import Task from '../components/Task';
import firestore from '@react-native-firebase/firestore';
import TaskForm from '../components/TaskForm';
import {SwipeListView} from 'react-native-swipe-list-view';
import Popup from '../components/Popup';

const MainScreenToDo = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const subscriber = firestore()
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        const tasks = [];
        querySnapshot.forEach(documentSnapshot => {
          tasks.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        dispatch(load_task_action(tasks));
      });

    return () => subscriber();
  }, []);
  const task = useSelector(state => state.toDo.task);

  const renderItem = ({item}) => (
    <Task
      id={item.key}
      title={item.title}
      details={item.details}
      uriImg={item.uriImg}
      checkboxState={item.checkboxState}
    />
  );
  const renderHiddenItem = () => (
    <View style={styles.rowBack}>
      <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
        <Text style={styles.backTextWhite}>Delete</Text>
      </View>
    </View>
  );
  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    if (value < -Dimensions.get('window').width) {
      dispatch(remove_task_action(key));
    }
  };

  return (
    <SafeAreaView>
      <Text style={styles.head}>Todo List</Text>
      <TaskForm />

      <SwipeListView
        disableRightSwipe
        data={task}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-Dimensions.get('window').width}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
      />
      <Popup />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  head: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    marginTop: 5,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});
export default MainScreenToDo;
