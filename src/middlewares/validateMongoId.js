import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId =
  (idName = 'id') =>
  (req, res, next) => {
    const id = req.params[idName];

    if (!id) {
      return next(createHttpError(400, `Parameter ${idName} is required`));
    }

    if (!isValidObjectId(id)) {
      return next(createHttpError(400, 'Invalid id format'));
    }

    next();
  };
