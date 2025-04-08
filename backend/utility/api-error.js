class APIError extends Error {
  constructor(message, statusCode, errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.successs = false;
    this.data = null;
    this.errors = errors;

    if (stack) {
      this.stack = process.env.NODE_ENV==='production' ? null : stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export { APIError };
