// src/controllers/contacts.js

import createError from 'http-errors';
import { deleteContact, getContactById } from '../services/contacts.js';

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const existingContact = await getContactById(contactId);
    if (!existingContact) {
      throw createError(404, 'Contact not found');
    }

    await deleteContact(contactId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
