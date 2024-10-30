import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../constants/colors';
import pixelPerfect from '../utils/pixelPerfect';

const CustomTextInput = props => {
  return (
    <TextInput
      {...props}
      style={[styles.textInput, props.customStyle]} // Apply custom styles correctly
      autoCorrect={false} // Disables suggestions
      autoCapitalize="none" // Disables auto-capitalization
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
    height: pixelPerfect(50),
  },
});

export default CustomTextInput;
