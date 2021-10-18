import React from 'react';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

const Popup = () => {
  const isChangesSaved = useSelector(state => state.toDo.isChangesSaved);
  const marginValue = React.useRef(new Animated.Value(-750)).current;

  const setDownAnimation = () => {
    Animated.timing(marginValue, {
      toValue: -750,
      duration: 1000,
    }).start();
  };
  const setUpAnimation = () => {
    Animated.timing(marginValue, {
      toValue: -600,
      duration: 1000,
    }).start();
  };
  React.useEffect(() => {
    if (isChangesSaved) {
      return setUpAnimation();
    }
    setDownAnimation();
  }, [isChangesSaved]);

  return (
    <SafeAreaView style={{position: 'absolute'}}>
      <Animated.View
        style={[
          styles.popup,
          {
            bottom: marginValue,
          },
        ]}>
        <Text style={styles.textPopup}>Changes Saved</Text>
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  popup: {
    width: 200,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    backgroundColor: 'rgb(0,0,0)',
    alignItself: 'center',
    borderRadius: 10,
    bottom: -750,
  },
  textPopup: {
    color: 'rgb(255,255,255)',
    fontSize: 20,
    textAlign: 'center',
  },
});
export default Popup;
