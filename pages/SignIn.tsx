import React, {useState} from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';

import {useDispatch} from 'react-redux';
import {setAuth} from '../redux/slices/authSlice';

import {Button, Input} from '@rneui/base';
import EncryptedStorage from 'react-native-encrypted-storage';

import allUser from '../mock/userLoginData.json';

const SignIn = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.length === 0) {
      Alert.alert('Please Enter Username');
      return;
    }
    if (password.length === 0) {
      Alert.alert('Please Enter Password');
      return;
    }
    let flag = false;
    allUser.forEach(ele => {
      if (ele.username === username) {
        flag = true;
        if (ele.password !== password) {
          Alert.alert('Wrong Password');
        } else {
          Alert.alert('You Have Succesfully Logged In');
          storeUser(ele);
        }
      }
    });
    if (!flag) {
      Alert.alert("Username Doesn't Exist in the Database");
    }
  };

  const storeUser = async (ele: any) => {
    try {
      await EncryptedStorage.setItem(
        'session',
        JSON.stringify({
          age: ele.age,
          username: ele.username,
          name: ele.name,
        }),
      );
      dispatch(setAuth({name: ele.name, username: ele.username, age: ele.age}));
    } catch (error) {
      console.log('Error occurs while Storing the User Seesion');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={{
          uri: 'https://img.freepik.com/free-vector/programming-education-concept-programmers-learn-coding-computer-illustration-people-reate-code-program-programming-languages-online-internet-learning-modern-education-technology_109722-2575.jpg?size=626&ext=jpg',
        }}
      />
      <View style={styles.eachForm}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={e => setUsername(e)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={e => setPassword(e)}
        />
        <Button
          title="Sign In"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          titleStyle={styles.buttontitleStyle}
          onPress={handleLogin}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  imageStyle: {
    flex: 3,
  },
  eachForm: {
    flex: 3,
    alignItems: 'center',
  },
  buttonContainer: {
    width: 350,
    marginHorizontal: 50,
    marginVertical: 10,
  },
  buttontitleStyle: {
    color: 'white',
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: '#1877F2',
  },
});

export default SignIn;
