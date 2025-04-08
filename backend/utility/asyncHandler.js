const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

export { asyncHandler };
