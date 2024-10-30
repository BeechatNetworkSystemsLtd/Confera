import React from 'react';
import {Platform, SafeAreaView, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {SIZES} from '../constants/sizes';
import pixelPerfect from '../utils/pixelPerfect';

export default function Screen({children, customStyle, container}) {
  return Platform.OS === 'ios' ? (
    <SafeAreaView
      style={[{flex: 1, backgroundColor: COLORS.grayColor}, {...container}]}>
      <View style={[styles.screenIOS, {...customStyle}]}>{children}</View>
    </SafeAreaView>
  ) : (
    <View style={[styles.screen, {...customStyle}]}>{children}</View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.grayColor,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: pixelPerfect(29),
    paddingBottom: 50,
    // paddingLeft: 50,
  },
  screenIOS: {
    flex: 1,
    backgroundColor: COLORS.grayColor,
    paddingVertical: SIZES.padding / 2,
    paddingHorizontal: pixelPerfect(20),

    // paddingTop: pixelPerfect(70),
    // paddingBottom: 50,
  },
});
