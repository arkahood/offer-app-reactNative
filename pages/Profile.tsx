import React from 'react';
import {Avatar} from '@rneui/base';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

const Profile = () => {
  const user = useSelector((state: any) => state.auth);

  return (
    <>
      <View style={styles.aboveAvatar} />
      <View style={styles.container}>
        <Avatar
          size={120}
          rounded
          source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
          avatarStyle={styles.avatar}
        />
        <View style={styles.eachRow}>
          <Text style={styles.heading}>NAME </Text>
          <Text style={styles.infoText}>{user.name}</Text>
        </View>
        <View style={styles.eachRow}>
          <Text style={styles.heading}>USERNAME</Text>
          <Text style={styles.infoText}>{user.username}</Text>
        </View>
        <View style={styles.eachRow}>
          <Text style={styles.heading}>AGE</Text>
          <Text style={styles.infoText}>{user.age}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 5,
    borderColor: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    top: -60,
  },
  aboveAvatar: {
    flex: 0.5,
    backgroundColor: '#FF5A5F',
  },
  eachRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    // borderBottomWidth : 1,
    // borderColor : 'grey',
    width: 350,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
  },
  infoText: {
    fontSize: 20,
  },
});

export default Profile;
