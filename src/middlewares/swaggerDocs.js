import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/index.js';

export const swaggerDocs = () => {
  try {
    if (!fs.existsSync(SWAGGER_PATH)) {
      throw new Error(`Swagger file not found at ${SWAGGER_PATH}`);
    }

    const fileContent = fs.readFileSync(SWAGGER_PATH, 'utf8');
    if (!fileContent) {
      throw new Error(`Swagger file at ${SWAGGER_PATH} is empty`);
    }

    const swaggerDoc = JSON.parse(fileContent);
    return [swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    console.error(`Failed to load Swagger docs: ${err.message}`);
    return [
      (req, res, next) => next(createHttpError(500, "Can't load swagger docs")),
    ];
  }
};
