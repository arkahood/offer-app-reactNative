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
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import Offers from './pages/Offers';
import { Button, Icon } from '@rneui/base';

import EncryptedStorage from 'react-native-encrypted-storage';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import { useDispatch, useSelector } from 'react-redux';

import { setAuth } from './redux/slices/authSlice';
import SettingsNavigation from './pages/SettingsNavigation';
import { addOffer } from './redux/slices/offerSlice';

const Tab = createBottomTabNavigator();

function WelcomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [toggle, setToggle] = useState(false);

  const auth = useSelector((state:any)=>state.auth);
  const dispatch = useDispatch();

  async function retrieveUserSession() {
    try {   
        const session = await EncryptedStorage.getItem("session");
        const storedOffers = await EncryptedStorage.getItem("offer");
    
        if (session) {
            setToggle(true);
            // console.log("Hii got it->",session);
            dispatch(setAuth(JSON.parse(session)));
            if(storedOffers){
              dispatch(addOffer(JSON.parse(storedOffers)));
            }
        }
    } catch (error) {
        console.log('Error happend While retrieving the Data');
        
    }
}

  useEffect(()=>{
    retrieveUserSession();
  },[])
  
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
          component={SettingsNavigation} 
          options={{
            tabBarIcon: () => <Icon name='code' />,
            headerShown: false
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
