// import {createSlice} from '@reduxjs/toolkit';

// export const contactsSlice = createSlice({
//   name: 'contactsSlice',
//   initialState: {
//     contacts: [],
//     groupByDate: false,
//   },
//   reducers: {
//     addContact: (state, action) => {
//       return {...state, contacts: action?.payload};
//     },
//     updateContact: (state, action) => {
//       return {...state, contacts: action?.payload};
//     },
//     updateGroupBy: (state, action) => {
//       return {...state, groupByDate: action?.payload};
//     },
//   },
// });

// export const {addContact, updateContact, updateGroupBy} = contactsSlice.actions;

// export default contactsSlice.reducer;

import {createSlice} from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contactsSlice',
  initialState: {
    contacts: [],
    groupByDate: false,
  },
  reducers: {
    addContact: (state, action) => {
      // Adds the new contact to the existing contacts array
      state.contacts = [...state.contacts, action.payload];
    },
    updateContact: (state, action) => {
      // Finds the contact by id and updates its details
      const {id, updatedContact} = action.payload;
      state.contacts = state.contacts.map(contact =>
        contact.id === id ? {...contact, ...updatedContact} : contact,
      );
    },
    deleteContact: (state, action) => {
      const {id} = action.payload;
      state.contacts = state.contacts.filter(contact => contact.id !== id);
    },
    updateGroupBy: (state, action) => {
      state.groupByDate = action.payload;
    },
  },
});

export const {addContact, updateContact, updateGroupBy, deleteContact} =
  contactsSlice.actions;

export default contactsSlice.reducer;
