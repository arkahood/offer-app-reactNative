import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar} from '@rneui/themed';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useDispatch} from 'react-redux';
import {removeAuth} from '../redux/slices/authSlice';

const Settings = ({navigation}: any): JSX.Element => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await EncryptedStorage.removeItem('session');
      await EncryptedStorage.removeItem('offer');

      dispatch(removeAuth(1));
    } catch (error) {
      console.log('Errror happend while removing Auth');
    }
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.aboveProfileImg} />
      <View style={styles.settingBody}>
        <Avatar
          size={120}
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          avatarStyle={{borderWidth: 5, borderColor: 'white'}}
        />
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profile Information</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate('OFFERS')}>
          <Text style={styles.buttonText}>My Offers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.LogOutbuttons} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  aboveProfileImg: {
    flex: 3,
    backgroundColor: 'black',
  },
  settingBody: {
    flex: 7,
    alignItems: 'center',
    top: -70,
  },
  buttons: {
    width: 350,
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
    marginTop: 30,
    // borderColor:'black',
    // borderWidth:1,
    borderRadius: 20,
  },
  LogOutbuttons: {
    width: 350,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 5,
    marginTop: 30,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Settings;
