// src/routers/contacts.js

import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
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

// Маршрути для отримання всіх контактів і контакту за ID
router.get('/', ctrlWrapper(getAllContactsController));
router.get('/:contactId', ctrlWrapper(getContactByIdController));

export default router;
