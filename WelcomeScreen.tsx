/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Settings from './pages/Settings';
import Offers from './pages/Offers';
import { Button, Icon } from '@rneui/base';

import EncryptedStorage from 'react-native-encrypted-storage';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './redux/store';
import { setAuth } from './redux/slices/authSlice';

const Tab = createBottomTabNavigator();

function WelcomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [toggle, setToggle] = useState(false);

  const auth = useSelector((state:any)=>state.auth);
  const dispatch = useDispatch();

  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("session");
    
        if (session) {
            setToggle(true);
            console.log("Hii got it->",session);
            dispatch(setAuth(1));
        }
    } catch (error) {
        console.log('Error happend While retrieving the Data');
        
    }
}

  useEffect(()=>{
    retrieveUserSession();
  },[])
  useEffect(()=>{},[auth]);
  
  return (
    <>
    { !auth.isAuthenticated ? <SignIn /> :
    <NavigationContainer>
      <Tab.Navigator>

        <Tab.Screen 
          name='Home' 
          component={Home} 
        />

        <Tab.Screen 
          name='OFFERS' 
          component={Offers} 
        />

        <Tab.Screen 
          name='SETTINGS' 
          component={Settings} 
          options={{
            tabBarIcon: () => <Icon name='code' />
          }} />
      </Tab.Navigator>

    </NavigationContainer>}
    </>
    );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default WelcomeScreen;
