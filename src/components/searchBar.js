import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {SIZES} from '../constants/sizes';
import {COLORS} from '../constants/colors';
import pixelPerfect from '../utils/pixelPerfect';
const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Search Contact" />
    </View>
  );
};
export default SearchBar;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: SIZES.buttonRadius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    height: pixelPerfect(50),
    padding: 5,
    marginTop: pixelPerfect(10),
  },
  input: {
    flex: 1,
  },
});
