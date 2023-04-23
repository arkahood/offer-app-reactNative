/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useState, useEffect} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {setAuth} from './redux/slices/authSlice';
import {addOffer} from './redux/slices/offerSlice';

import EncryptedStorage from 'react-native-encrypted-storage';
import SplashScreen from 'react-native-splash-screen';

import Offers from './pages/Offers';

import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SettingsNavigation from './pages/SettingsNavigation';

import HeaderAvatar from './components/HeaderAvatar';
import TabBarIcon from './components/TabBarIcon';

const Tab = createBottomTabNavigator();

function WelcomeScreen(): JSX.Element {
  const [toggle, setToggle] = useState(false);

  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const retrieveUserSession = async () => {
      try {
        const session = await EncryptedStorage.getItem('session');
        const storedOffers = await EncryptedStorage.getItem('offer');

        if (session) {
          dispatch(setAuth(JSON.parse(session)));
          if (storedOffers) {
            dispatch(addOffer(JSON.parse(storedOffers)));
          }
        }
        setToggle(true);
      } catch (error) {
        console.log('Error happend While retrieving the Data');
      }
    };

    retrieveUserSession().then(() => {
      if (toggle) {
        SplashScreen.hide();
      }
    });
  }, [toggle, dispatch]);

  return (
    <>
      {!auth.isAuthenticated ? (
        <SignIn />
      ) : (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={Home}
              options={({navigation}) => {
                return {
                  tabBarLabel: '',
                  headerRight: () => <HeaderAvatar navigation={navigation} />,
                  tabBarIcon: () => (
                    <TabBarIcon name="https://static.vecteezy.com/system/resources/previews/000/366/438/original/home-vector-icon.jpg" />
                  ),
                };
              }}
            />

            <Tab.Screen
              name="OFFERS"
              component={Offers}
              options={{
                tabBarLabel: '',
                tabBarIcon: () => (
                  <TabBarIcon
                    notification={true}
                    name="https://th.bing.com/th/id/R.274b26a192bdcaf8dd32ec28d00ff102?rik=c2WORYfsk%2fTrJw&riu=http%3a%2f%2fcdn.onlinewebfonts.com%2fsvg%2fimg_275895.png&ehk=Pf1lBrqmbBCZGyythI4Z0ahbYGsUzHDyiTDHBJdwnl8%3d&risl=&pid=ImgRaw&r=0"
                  />
                ),
                headerShown: false,
              }}
            />

            <Tab.Screen
              name="SETTINGS"
              component={SettingsNavigation}
              options={{
                tabBarLabel: '',
                tabBarIcon: () => (
                  <TabBarIcon name="https://th.bing.com/th/id/OIP.nTK-yAWL01laY6CKjMEq3gHaHa?pid=ImgDet&rs=1" />
                ),
                headerShown: false,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

export default WelcomeScreen;
