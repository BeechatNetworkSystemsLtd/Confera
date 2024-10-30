import React from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {COLORS} from '../constants/colors';
import {H2} from './text';
import pixelPerfect from '../utils/pixelPerfect';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {IMAGES} from '../constants/images';
import {SIZES} from '../constants/sizes';
import {SCREEN} from '../constants/screens';
import {dispatch} from '../redux/store';
import {deleteContact} from '../redux/slices/contactsSlice';
const ContactItem = props => {
  const {item} = props;

  const handleDeleteContact = () => {
    Alert.alert(
      'Delete Contact',
      `Are you sure you want to delete ${item?.name}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            dispatch(deleteContact({id: item.id}));
          },
        },
      ],
      {cancelable: true},
    );
  };
  return (
    <View style={styles.row}>
      <View style={styles.container}>
        <H2 customStyle={{textAlign: 'left'}}>{item?.name}</H2>
        <H2
          customStyle={{
            textAlign: 'left',
            marginTop: pixelPerfect(5),
            color: COLORS.gray,
            fontSize: pixelPerfect(14),
          }}>
          {item?.phoneNumber}
        </H2>
      </View>
      <Menu>
        <MenuTrigger
          style={{padding: 3, width: '100%'}}
          hitSlop={{
            top: 25,
            bottom: 25,
            left: 15,
            right: 15,
          }}>
          <Image source={IMAGES.dotIcon} style={styles.menuIcon} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: styles.menuPopupContainer,
          }}>
          <MenuOption
            onSelect={() =>
              props.navigation.navigate(SCREEN.ADD_CONTACT, {
                isEdit: true,
                item: item,
              })
            }>
            <View style={styles.optionContainer}>
              <H2 customStyle={{textAlign: 'left'}}>Edit</H2>
            </View>
          </MenuOption>
          <MenuOption onSelect={handleDeleteContact}>
            <View style={styles.optionContainer}>
              <H2 customStyle={{textAlign: 'left', color: 'red'}}>Delete</H2>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};
export default ContactItem;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.3,
    paddingBottom: pixelPerfect(10),
    marginTop: pixelPerfect(15),
  },
  container: {
    width: '90%',
    borderBottomColor: COLORS.gray,
  },
  menuIcon: {
    height: pixelPerfect(24),
    width: pixelPerfect(24),
  },
  menuPopupContainer: {
    width: pixelPerfect(100),
    borderRadius: SIZES.radius,
    padding: pixelPerfect(10),
    borderColor: COLORS.primary,
    borderWidth: 1,
    marginLeft: -20,
    marginTop: 20,
  },
  optionContainer: {
    marginVertical: pixelPerfect(3),
  },
});
