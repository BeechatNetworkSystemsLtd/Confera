import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch} from 'react-native';
import Screen from './Screen';
import BackHeader from '../components/backHeader';
import {H1, H2} from '../components/text';
import pixelPerfect from '../utils/pixelPerfect';
import {COLORS} from '../constants/colors';
import {dispatch, useSelector} from '../redux/store';
import {updateGroupBy} from '../redux/slices/contactsSlice';
const Settings = props => {
  const toggleSwitch = () => dispatch(updateGroupBy(!groupByDate));
  const {groupByDate} = useSelector(state => state.contactsReducer);
  return (
    <Screen>
      <BackHeader {...props} />
      <H2 customStyle={{textAlign: 'left', marginTop: pixelPerfect(10)}}>
        Settings
      </H2>
      <View style={styles.divider} />
      <View style={styles.row}>
        <H2>Group By Date</H2>

        <Switch
          trackColor={{false: '#767577', true: COLORS.primary}}
          thumbColor={groupByDate ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={groupByDate}
        />
      </View>
    </Screen>
  );
};
export default Settings;
const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 0.5,
    paddingBottom: pixelPerfect(20),
  },
  divider: {
    height: pixelPerfect(50),
  },
});
