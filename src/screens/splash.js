import React, {useEffect, useState} from 'react';
import {Animated, Dimensions, StatusBar, StyleSheet, View} from 'react-native';

import {CommonActions} from '@react-navigation/native';

import pixelPerfect from '../utils/pixelPerfect';
import {COLORS} from '../constants/colors';
import {SCREEN} from '../constants/screens';
import {useSelector} from '../redux/store';
import {IMAGES} from '../constants/images';
const {height, width} = Dimensions.get('window');

const SplashScreen = props => {
  let [splashBackAnim, setSplashBackAnim] = useState(new Animated.Value(0));
  let [splashOverlayAnim, setSplashOverlayAnim] = useState(
    new Animated.Value(0),
  );
  useEffect(() => {
    setTimeout(() => {
      Animated.sequence([
        Animated.timing(splashBackAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(splashOverlayAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(async () => {
        reset(true);
      });
    }, 1500);
  }, []);

  reset = async () => {
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: SCREEN.HOME,
          },
        ],
      }),
    );
  };
  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />

      <View style={styles.mainContainer}>
        <View style={{borderRadius: pixelPerfect(20), overflow: 'hidden'}}>
          <Animated.Image
            source={IMAGES.logoWhite}
            style={[styles.logo, {opacity: splashBackAnim}]}
            resizeMode={'contain'}
            borderRadius={pixelPerfect(20)}
          />
        </View>
      </View>
    </>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0098AA',
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0098AA',
  },
  logo: {
    height: height / 2.3,
    width: width / 2.3,
    alignSelf: 'center',
    borderRadius: pixelPerfect(20),
    // marginTop: height / 15,
  },
  healthAndWellness: {
    color: COLORS.white,
    fontSize: pixelPerfect(16),
    alignSelf: 'center',
    fontWeight: '500',
  },
});
