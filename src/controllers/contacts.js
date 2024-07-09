// src/controllers/contacts.js

import { getAllContacts, getContactById } from '../services/contacts.js';

export const getAllContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      data: contacts,
      message: 'Successfully found contacts!',
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) throw new Error('Contact not found');
    res.status(200).json({
      status: 200,
      data: contact,
      message: `Successfully found contact with id ${contactId}!`,
    });
  } catch (error) {
    next({ message: 'Contact not found!', status: 404 });
  }
};
