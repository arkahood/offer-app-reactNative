import React from 'react';
import {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

const TabBarIcon = ({name, notification}: any): JSX.Element => {
  const offer = useSelector((state: any) => state.offer);
  const [text, setText] = useState(0);
  useEffect(() => {
    setText(offer.data.length);
  }, [offer]);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={{
          uri: name,
        }}
        style={{...styles.tinyLogo, top: notification ? 20 : 5}}
      />
      {notification && <Text style={styles.not}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 35,
    height: 35,
  },
  not: {
    top: -30,
    right: -15,
    fontWeight: 'bold',
    color: 'red',
    fontSize: 20,
  },
});

export default TabBarIcon;
