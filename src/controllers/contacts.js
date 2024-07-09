// src/controllers/contacts.js

import createError from 'http-errors';
import { updateContact, getContactById } from '../services/contacts.js';

export const updateContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  try {
    // Перевірка, чи існує контакт за заданим contactId
    const existingContact = await getContactById(contactId);
    if (!existingContact) {
      throw createError(404, 'Contact not found');
    }

    // Оновлення контакту
    const updatedContact = await updateContact(contactId, {
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};
