class ResponseError extends Error {
  constructor(messageOrObject, statusCode) {
    super(
      typeof messageOrObject === "string"
        ? messageOrObject
        : JSON.stringify(messageOrObject) || "An error occurred"
    );
    this.name = this.constructor.name;
    this.statusCode = statusCode || 500;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ResponseError;
