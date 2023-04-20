import { Avatar } from "@rneui/base";
import { Text, View, StyleSheet } from "react-native"
import { useSelector } from "react-redux";

const Profile = () => {

    const user = useSelector((state:any) => state.auth);
    
    return(
        <>
            <View style={styles.aboveAvatar}></View>
            <View style={styles.container}>
            <Avatar
                size={120}
                rounded
                source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                
            />
            <View style={styles.eachRow}>
            <Text style={styles.heading}>NAME  </Text>
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
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        top:-60
    },
    aboveAvatar : {
        flex:.5,
        backgroundColor : 'black'
    },
    eachRow : {
        display:"flex",
        flexDirection:"row",
        alignItems:"center",
        justifyContent : "space-between",
        marginTop:20,
        // borderBottomWidth : 1,
        // borderColor : 'grey',
        width: 300
    },
    heading : {
        fontSize : 30,
        fontWeight:"bold"
    },
    infoText : {
        fontSize : 20
    }
})

export default Profile;