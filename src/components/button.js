import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import fonts from '../constants/fonts';
import {SIZES} from '../constants/sizes';

const CustomButton = ({title, onPress, style, textStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]} // Merge custom style with default styles
      onPress={onPress}
      activeOpacity={0.8} // Add slight transparency on press
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    width: '100%',
    borderRadius: SIZES.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontFamily: fonts.medium,
  },
});

export default CustomButton;
