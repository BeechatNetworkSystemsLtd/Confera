import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Screen from './Screen';
import BackHeader from '../components/backHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {H2, RegularTxt} from '../components/text';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {IMAGES} from '../constants/images';
import pixelPerfect from '../utils/pixelPerfect';
import {SIZES} from '../constants/sizes';
import {COLORS} from '../constants/colors';
import SearchBar from '../components/searchBar';
import ContactItem from '../components/contactItem';
import {SCREEN} from '../constants/screens';
import {useSelector} from '../redux/store';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import moment from 'moment';
const HomeScreen = props => {
  const {contacts, groupByDate} = useSelector(state => state.contactsReducer);

  console.log('data for ', contacts);
  const exportContacts = async () => {
    try {
      const groupedContacts = groupContactsByDate(contacts);
      const ungroupedContacts = contacts.map(
        ({id, timeStamp, customFields, ...rest}) => ({
          ...rest,
          ...convertCustomFields(customFields || []), // Convert custom fields to direct properties
        }),
      );

      // Convert contacts array to JSON string
      const contactsJSON = JSON.stringify(
        groupByDate ? groupedContacts : ungroupedContacts,
        null,
        2,
      );

      // Set file path and name
      const path = `${RNFS.DocumentDirectoryPath}/contacts.json`;

      // Write JSON string to a file
      await RNFS.writeFile(path, contactsJSON, 'utf8');

      // Share the file
      await Share.open({
        url: `file://${path}`,
        type: 'application/json',
        title: 'Export Contacts',
      });

      Alert.alert('Success', 'Contacts exported successfully');
    } catch (error) {
      console.error('Error exporting contacts:', error);
    }
  };

  const groupContactsByDate = contacts => {
    return contacts.reduce((grouped, contact) => {
      const date = moment(contact.timeStamp).format('DD-MM-YYYY');
      const {id, timeStamp, customFields, ...contactWithoutIdAndTimestamp} =
        contact;
      const contactWithCustomFields = {
        ...contactWithoutIdAndTimestamp,
        ...convertCustomFields(customFields || []),
      };

      if (!grouped[date]) {
        grouped[date] = [];
      }

      grouped[date].push(contactWithCustomFields);
      return grouped;
    }, {});
  };

  const convertCustomFields = customFields => {
    return customFields.reduce((acc, field) => {
      // Ensure no duplicate keys are created
      if (!acc.hasOwnProperty(field.label)) {
        acc[field.label] = field.value;
      }
      return acc;
    }, {});
  };

  return (
    <Screen>
      <BackHeader {...props} hideBackIcon />
      <View style={styles.row}>
        <H2>My Contacts</H2>
        <Menu>
          <MenuTrigger
            style={{padding: 3}}
            hitSlop={{
              top: 25,
              bottom: 25,
              left: 15,
              right: 15,
            }}>
            <Image source={IMAGES.menuIcon} style={styles.menuIcon} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: styles.menuPopupContainer,
            }}>
            <MenuOption onSelect={exportContacts}>
              <View style={styles.optionContainer}>
                <Image source={IMAGES.exportIcon} style={styles.optionIcon} />
                <H2>Export Contacts</H2>
              </View>
            </MenuOption>
            <MenuOption
              onSelect={() => props.navigation.navigate(SCREEN.SETTINGS)}>
              <View style={styles.optionContainer}>
                <Image source={IMAGES.gearIcon} style={styles.optionIcon} />
                <H2>Settings</H2>
              </View>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>
      {/* <SearchBar /> */}

      <View style={styles.divider} />
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {contacts.map(data => {
          return <ContactItem item={data} {...props} />;
        })}

        {contacts.length == 0 ? (
          <View style={{marginTop: pixelPerfect(100)}}>
            <H2>No Record Found</H2>
          </View>
        ) : null}
      </KeyboardAwareScrollView>

      <TouchableOpacity
        style={styles.addContacttBtn}
        onPress={() => props.navigation.navigate(SCREEN.ADD_CONTACT)}>
        <Image source={IMAGES.addButtonIcon} style={styles.addContactIcon} />
      </TouchableOpacity>
    </Screen>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuIcon: {
    height: pixelPerfect(24),
    width: pixelPerfect(24),
  },
  menuPopupContainer: {
    width: pixelPerfect(200),
    borderRadius: SIZES.radius,
    padding: pixelPerfect(10),
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: -20,
    marginTop: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: pixelPerfect(5),
    // justifyContent: 'space-between',
  },
  optionIcon: {
    height: pixelPerfect(24),
    width: pixelPerfect(24),
    marginRight: pixelPerfect(10),
  },
  addContacttBtn: {
    position: 'absolute',
    bottom: pixelPerfect(40),
    right: pixelPerfect(30),
  },
  addContactIcon: {
    height: pixelPerfect(44),
    width: pixelPerfect(44),
  },
  divider: {
    height: pixelPerfect(30),
  },
});
