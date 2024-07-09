// src/middlewares/errorHandlers.js

import createError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';
  const data = err.data || {};

  res.status(status).json({
    status,
    message,
    data,
  });
};

export const notFoundHandler = (req, res, next) => {
  next(createError(404, 'Route not found'));
};
