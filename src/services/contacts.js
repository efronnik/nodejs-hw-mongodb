// src/services/contacts.js

export const deleteContact = async (contactId) => {
  try {
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      throw new Error('Contact not found');
    }

    contacts = contacts.filter((contact) => contact.id !== contactId);
  } catch (error) {
    throw error;
  }
};
