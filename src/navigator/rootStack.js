import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SCREEN} from '../constants/screens';

import HomeScreen from '../screens/homeScreen';
import SplashScreen from '../screens/splash';
import AddNewContact from '../screens/addNewContact';
import Settings from '../screens/settings';

const RootStack = () => {
  const {SPLASH, HOME, ADD_CONTACT, SETTINGS} = SCREEN;

  const MainStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={SPLASH}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen component={SplashScreen} name={SPLASH} />
        <MainStack.Screen component={HomeScreen} name={HOME} />
        <MainStack.Screen component={AddNewContact} name={ADD_CONTACT} />
        <MainStack.Screen component={Settings} name={SETTINGS} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
