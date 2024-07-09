// src/routers/contacts.js

import express from 'express';
import {
  getAllContactsController,
  getContactByIdController,
} from '../controllers/contacts.js';

const router = express.Router();

// Route for getting all contacts
router.get('/', getAllContactsController);

// Route for getting a contact by id
router.get('/:contactId', getContactByIdController);

export default router;
