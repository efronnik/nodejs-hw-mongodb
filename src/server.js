// src/server.js

import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import { ENV_VARS } from './constants/index.js';

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

  // Use contacts router for /contacts route
  app.use('/contacts', contactsRouter);

  // Handle 404 errors
  app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Error handling middleware
  app.use((error, _, res, __) => {
    const { message = 'Server internal error!', status = 500 } = error;
    res.status(status).json({ status, message });
  });

  app.listen(PORT, (error) => {
    if (error) {
      console.log('Server crushed. error: ', error);
      process.exit(1);
    }
    console.log('Server is running on port', PORT);
  });
};

export default setupServer;
