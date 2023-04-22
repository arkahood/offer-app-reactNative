import React from 'react';
import {Avatar} from '@rneui/base';
import {StyleSheet, View} from 'react-native';

const HeaderAvatar = ({navigation}: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Avatar
        size={35}
        rounded
        source={{uri: 'https://randomuser.me/api/portraits/men/36.jpg'}}
        onPress={() => navigation.navigate('SETTINGS', {screen: 'Profile'})}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
  },
});

export default HeaderAvatar;
