import Joi from 'joi'
import { IProductBodyUpdate } from '../../interfaces/product.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { UpdateProductExtraDBRequest } from './update.extra.db.request'

const rulesJoi = Joi.object({
  id: Joi.string()
    .length(24)
    .custom((value: string, helper: Joi.CustomHelpers<string>) => {
      if (!isValidObjectId(value)) {
        // @ts-ignore
        return helper.message('"id" is a invalid ID')
      }
      return true
    })
    .required(),

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

class UpdateProductRequest {
  public static validate = async (body: IProductBodyUpdate) => {
    await rulesJoi.validateAsync(body)
    await UpdateProductExtraDBRequest.validate(body)
  }
}

export { UpdateProductRequest }
