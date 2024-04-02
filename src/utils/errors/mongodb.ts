class MongoValidationError extends Error {
  public field: string
  constructor (message: string, field: string) {
    super(message);
    this.name = this.constructor.name;
    this.field = field
    Error.captureStackTrace(this, this.constructor);
  }
}

export { MongoValidationError }
