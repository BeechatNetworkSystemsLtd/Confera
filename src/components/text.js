import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import fonts from '../constants/fonts';
import pixelPerfect from '../utils/pixelPerfect';
const H1 = ({children, customStyle}) => {
  return <Text style={[style.textH1, {...customStyle}]}>{children}</Text>;
};
const H2 = ({children, customStyle}) => {
  return <Text style={[style.textH2, {...customStyle}]}>{children}</Text>;
};
const RegularTxt = ({children, customStyle}) => {
  return <Text style={[style.textRegular, {...customStyle}]}>{children}</Text>;
};
export {H1, H2, RegularTxt};
const style = StyleSheet.create({
  textH1: {
    fontFamily: fonts.bold,
    fontSize: pixelPerfect(24),
    color: COLORS.black,
    textAlign: 'center',
  },
  textH2: {
    fontFamily: fonts.medium,
    fontSize: pixelPerfect(18),
    color: COLORS.black,
    textAlign: 'center',
  },
  textRegular: {
    fontFamily: fonts.regular,
    fontSize: pixelPerfect(14),
    color: COLORS.black,
    textAlign: 'center',
  },
});
