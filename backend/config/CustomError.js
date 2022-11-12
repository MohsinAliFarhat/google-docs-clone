class CustomError extends Error {
    constructor(status = 500, message = "Something went bad", ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(...params)
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, CustomError)
      }
      this.message = message;
      this.status = status;
      this.time = new Date();
    }
  }
  
  module.exports = CustomError;