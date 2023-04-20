import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Settings from "./Settings";
import Profile from "./Profile";

const stack = createNativeStackNavigator();

const SettingsNavigation = () =>{
    return(
        <stack.Navigator>
            <stack.Screen name="Settings" component={Settings} options= { { headerShown: false }}/>
            <stack.Screen name="Profile" component={Profile}/>
        </stack.Navigator>
    )
}

export default SettingsNavigation;