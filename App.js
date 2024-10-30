import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RootStack from './src/navigator/rootStack';
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <RootStack />
    </MenuProvider>
  );
};

export default App;
