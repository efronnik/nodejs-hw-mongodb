// src/controllers/contacts.js

import createError from 'http-errors';
import { createContact } from '../services/contacts.js';

export const createContactController = async (req, res, next) => {
  const { name, phoneNumber } = req.body;
  const { email, isFavourite, contactType } = req.body;

  // Перевірка обов'язкових полів
  if (!name || !phoneNumber) {
    return next(createError(400, 'Name and phoneNumber are required'));
  }

  try {
    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};
