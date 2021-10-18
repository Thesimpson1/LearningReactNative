import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  TextInput,
  Button,
  Image,
} from 'react-native';
import {add_users_action} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import User from '../components/User';
import Preloader from '../helpers/Preloader';
import Search from '../components/Search';

const UsersScreen = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.users);
  const isLoading = useSelector(state => state.users.isLoading);
  const someError = useSelector(state => state.users.errorMessage);

  React.useEffect(() => {
    dispatch(add_users_action());
  }, []);
  const renderItem = ({item}) => (
    <User
      login={item.login}
      id={item.id}
      gitHub={item.html_url}
      avatar={item.avatar_url}
    />
  );

  return (
    <SafeAreaView>
      <Search />
      {isLoading ? <Preloader /> : null}
      <View>
        {someError ? (
          <Text>{someError}</Text>
        ) : (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
export default UsersScreen;
