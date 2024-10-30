import React, {useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackHeader from '../components/backHeader';
import CustomButton from '../components/button';
import {H2} from '../components/text';
import CustomTextInput from '../components/textInput';
import {IMAGES} from '../constants/images';
import {addContact, updateContact} from '../redux/slices/contactsSlice';
import {dispatch} from '../redux/store';
import pixelPerfect from '../utils/pixelPerfect';
import Screen from './Screen';

const AddNewContact = props => {
  const isEdit = props?.route?.params?.isEdit ? true : false;
  const [name, setName] = useState(
    isEdit ? props?.route?.params?.item?.name : '',
  );
  const [email, setEmail] = useState(
    isEdit ? props?.route?.params?.item?.email : '',
  );
  const [phoneNumber, setPhoneNumber] = useState(
    isEdit ? props?.route?.params?.item?.phoneNumber : '',
  );
  const [companyName, setCompanyName] = useState(
    isEdit ? props?.route?.params?.item?.companyName : '',
  );
  const [website, setWebsite] = useState(
    isEdit ? props?.route?.params?.item?.website : '',
  );

  // State to hold custom fields
  const [customFields, setCustomFields] = useState(
    isEdit ? props?.route?.params?.item?.customFields || [] : [],
  );

  // Add new custom field
  const handleAddCustomField = () => {
    setCustomFields([...customFields, {label: '', value: ''}]);
  };

  // Update a specific custom field
  const handleCustomFieldChange = (index, field, text) => {
    const updatedFields = [...customFields];
    const updatedField = {...updatedFields[index], [field]: text};
    updatedFields[index] = updatedField;
    setCustomFields(updatedFields);
  };

  // Remove a specific custom field
  const handleRemoveCustomField = index => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleSaveContact = () => {
    if (name.trim() !== '' && phoneNumber.trim() !== '') {
      const randomId = Math.random().toString(36).substring(2, 15);

      dispatch(
        addContact({
          id: randomId,
          name,
          phoneNumber,
          email,
          timeStamp: new Date(),
          companyName,
          website,
          customFields, // Save custom fields
        }),
      );
      props.navigation.goBack();
    } else {
      Alert.alert('Please enter name and phone number');
    }
  };

  const handleUpdateContact = () => {
    if (name.trim() !== '' && phoneNumber.trim() !== '') {
      dispatch(
        updateContact({
          id: props?.route?.params?.item?.id,
          updatedContact: {
            id: props?.route?.params?.item?.id,
            name,
            phoneNumber,
            email,
            timeStamp: props?.route?.params?.item?.timeStamp,
            companyName,
            website,
            customFields, // Update custom fields
          },
        }),
      );
      props.navigation.goBack();
    } else {
      Alert.alert('Please enter name and phone number');
    }
  };

  return (
    <Screen>
      <BackHeader {...props} />
      <View style={styles.divider} />
      <H2 customStyle={{textAlign: 'left'}}>Add New Contact</H2>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.divider} />
        <CustomTextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <View style={styles.divider} />
        <CustomTextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.divider} />

        <CustomTextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />

        <View style={styles.divider} />

        <CustomTextInput
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />

        <View style={styles.divider} />

        <CustomTextInput
          placeholder="Website"
          value={website}
          onChangeText={setWebsite}
        />
        <View style={styles.divider} />

        {/* Custom fields */}
        {customFields.map((field, index) => (
          <View key={index} style={styles.customFieldRow}>
            <CustomTextInput
              placeholder="Label"
              value={field.label}
              onChangeText={text =>
                handleCustomFieldChange(index, 'label', text)
              }
              customStyle={styles.customFieldInput}
            />
            <CustomTextInput
              placeholder="Value"
              value={field.value}
              onChangeText={text =>
                handleCustomFieldChange(index, 'value', text)
              }
              customStyle={styles.customFieldInput}
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveCustomField(index)}>
              <Image source={IMAGES.minusIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        ))}

        {/* Add custom field button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddCustomField}>
          <Text style={styles.addButtonText}>+ Add Custom Field</Text>
        </TouchableOpacity>

        <View style={styles.divider} />
        <CustomButton
          title={isEdit ? 'Update Contact' : 'Add Contact'}
          onPress={isEdit ? handleUpdateContact : handleSaveContact}
        />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default AddNewContact;

const styles = StyleSheet.create({
  divider: {
    height: pixelPerfect(20),
  },
  customFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: pixelPerfect(10),
  },
  customFieldInput: {
    marginHorizontal: pixelPerfect(5),
    width: '42%',
    paddingHorizontal: 0,
  },
  addButton: {
    alignSelf: 'flex-start',
    padding: pixelPerfect(10),
  },
  addButtonText: {
    color: '#007BFF',
  },
  removeButton: {
    paddingHorizontal: pixelPerfect(10),
    width: '16%',
  },
  icon: {
    height: pixelPerfect(24),
    width: pixelPerfect(24),
  },
});
