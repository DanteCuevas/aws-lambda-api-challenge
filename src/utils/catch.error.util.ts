import JoiErrorCustom from './errors/joi'
import { UnauthorizedError } from './errors/unauthorized'
import { MongoValidationError } from './errors/mongodb'
import { ResponseHandler } from './response.util'
import Joi from 'joi'

class CatchError {
  public static response (error: any) {
    if (error instanceof UnauthorizedError) {
      return ResponseHandler.unauthorized({ message: error.message });
    }
    if (error instanceof Joi.ValidationError) {
      const message = JoiErrorCustom.format(error)
      return ResponseHandler.unprocessableEntity(message);
    }
    if (error instanceof MongoValidationError) {
      return ResponseHandler.unprocessableEntity({ [error.field]: [error.message] });
    }

    return ResponseHandler.fail()
  }
}

export {
  CatchError
}
