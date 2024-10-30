import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {IMAGES} from '../constants/images';
import pixelPerfect from '../utils/pixelPerfect';
import {H1} from './text';
const BackHeader = props => {
  return (
    <View style={styles.container}>
      {props.hideBackIcon ? (
        <View style={styles.icon} />
      ) : (
        <TouchableOpacity
          hitSlop={{left: 10, right: 10, top: 10, bottom: 10}}
          onPress={() => props.navigation.goBack()}>
          <Image source={IMAGES.arrowBack} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Image source={IMAGES.logoIcon} style={styles.logo} />
      <View style={styles.icon} />
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: pixelPerfect(24),
    width: pixelPerfect(24),
  },
  logo: {
    width: pixelPerfect(137),
    height: pixelPerfect(53),
    resizeMode: 'contain',
  },
});
