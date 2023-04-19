import React from 'react';
import { View , Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { Avatar } from '@rneui/themed';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch } from 'react-redux';
import { removeAuth } from '../redux/slices/authSlice';

const Settings  = () : JSX.Element => {

    const dispatch = useDispatch();

    const handleLogout = async()=>{
        try {
            await EncryptedStorage.removeItem("session");
            dispatch(removeAuth(1));
        } catch (error) {
            console.log("Errror happend while removing Auth");
        }
    }

    return(
        <View style={{flex:1}}>
            <View style={styles.aboveProfileImg}></View>
            <View style={styles.settingBody}>
            <Avatar
                size={120}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            />
            <TouchableOpacity style={styles.buttons}>
                <Text>Profile Information</Text>        
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
                <Text>My Offers</Text>        
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttons} onPress={handleLogout}>
                <Text>Log Out</Text>        
            </TouchableOpacity>
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    aboveProfileImg : {
        flex:3,
        backgroundColor:'black'
    },
    settingBody : {
        flex:7,
        alignItems:'center',
        top:-70,
    },
    buttons : {
        width:350,
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 20,
        marginTop:30,
        borderColor:'black',
        borderWidth:1,
        borderRadius:20
    }
})

export default Settings;