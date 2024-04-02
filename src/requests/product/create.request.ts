import Joi from 'joi'
import { IProductBodyCreate } from '../../interfaces/product.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { CreateProductExtraDBRequest } from './create.extra.db.request'

const rulesJoi = Joi.object({
  name: Joi.string()
    .max(30)
    .required(),

  description: Joi.string()
    .max(200),

  price: Joi.number()
    .min(1)
    .max(1_000_000)
    .required(),

  stock: Joi.number()
    .min(1)
    .max(200)
    .required(),

  category_id: Joi.string()
    .length(24)
    .custom((value: string, helper: Joi.CustomHelpers<string>) => {
      if (!isValidObjectId(value)) {
        // @ts-ignore
        return helper.message('"category_id" is a invalid ID')
      }
      return true
    })
    .required()
}).options({ abortEarly: false });

class CreateProductRequest {
  public static validate = async (body: IProductBodyCreate) => {
    await rulesJoi.validateAsync(body)
    await CreateProductExtraDBRequest.validate(body)
  }
}

export { CreateProductRequest }
