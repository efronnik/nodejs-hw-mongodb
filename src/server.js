import express from 'express';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { env } from './utils/env.js';
import { ENV_VARS } from './constants/index.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = () => {
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

  // Обробка swaggerDocs
  const swaggerMiddleware = swaggerDocs();
  if (!Array.isArray(swaggerMiddleware) || swaggerMiddleware.length !== 2) {
    console.error(
      'swaggerDocs() did not return the expected middleware functions',
    );
    process.exit(1);
  }

  const [swaggerServe, swaggerSetup] = swaggerMiddleware;
  app.use('/api-docs', swaggerServe, swaggerSetup);

  app.use(express.json());

  app.use(cookieParser());

  app.use(express.urlencoded({ extended: true }));

  app.use(router);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) {
      console.log('Server crashed. error: ', error);
      process.exit(1);
    }
    console.log('Server is running on port', PORT);
  });
};
