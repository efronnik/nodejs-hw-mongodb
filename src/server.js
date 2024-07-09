// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { ENV_VARS } from './constants/index.js';
import createError from 'http-errors'; // імпорт пакету http-errors

const setupServer = () => {
  const PORT = env(ENV_VARS.PORT, '3000');
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(cors());

  // Використовуємо роутер контактів для маршруту /contacts
  app.use('/contacts', contactsRouter);

  // Middleware для обробки помилок 404 (маршрути не знайдені)
  const notFoundHandler = (req, res, next) => {
    next(createError(404, 'Route not found'));
  };

  app.use(notFoundHandler);

  // Middleware для обробки всіх інших помилок
  const errorHandler = (err, req, res, next) => {
    const { status = 500, message = 'Something went wrong', data } = err;
    res.status(status).json({ status, message, data });
  };

  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, (error) => {
    if (error) {
      console.log('Server crushed. error: ', error);
      process.exit(1);
    }
    console.log('Server is running on port', PORT);
  });
};

export default setupServer;
