// src/routers/contacts.js

import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
  createContactController,
} from '../controllers/contacts.js';

const router = express.Router();

// Обгортка для контролерів
const ctrlWrapper = (ctrlFn) => async (req, res, next) => {
  try {
    await ctrlFn(req, res, next);
  } catch (error) {
    next(error);
  }
};

// Маршрути для отримання всіх контактів, контакту за ID і створення нового контакту
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.post('/', ctrlWrapper(createContactController)); // POST /contacts для створення нового контакту

export default router;
