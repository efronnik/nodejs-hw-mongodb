// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { setupServer } from './utils/env.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandlers.js';
import contactsRouter from './routers/contacts.js';

const app = express();
const PORT = setupServer();

app.use(
  pino({
    transport: {
      target: 'pino-pretty',
    },
  }),
);
app.use(cors());
app.use(express.json());

// Підключення роутера для контактів
app.use(contactsRouter);

// Middleware для обробки помилок 404 (неіснуючі маршрути)
app.use(notFoundHandler);

// Middleware для обробки всіх інших помилок
app.use(errorHandler);

app.listen(PORT, (error) => {
  if (error) {
    console.error('Server crushed. Error:', error);
    process.exit(1);
  }
  console.log('Server is running on port', PORT);
});
