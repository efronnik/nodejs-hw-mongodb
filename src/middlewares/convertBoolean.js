export const convertBoolean = (req, res, next) => {
  const value = req.body.isFavourite;
  if (value && ['true', 'false'].includes(value)) {
    req.body.isFavourite = value === 'true';
  }
  next();
};
