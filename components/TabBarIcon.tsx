import { useEffect, useState } from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  tinyLogo: {
    width: 25,
    height: 25,
  },
  not : {
    top:-25,
    right : -20,
    fontWeight:'bold',
    color:'red',
    fontSize:30
  }
});
const TabBarIcon = ({name, notification}:any) => {
    const offer = useSelector((state:any)=>state.offer);
    const [text, setText] = useState(0);
    useEffect(()=>{
        setText(offer.data.length);
    },[offer]);
    return(
        <View>
            <Image source={{
                uri : name
            }} 
            style={{...styles.tinyLogo, top : notification ? 20 : 0}}
            />
            {notification && <Text style={styles.not}>{text}</Text>}
        </View>
    )
}


export default TabBarIcon;
