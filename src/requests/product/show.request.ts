import Joi from 'joi'
import { IProductQueryParams } from '../../interfaces/product.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { ShowProductExtraDBRequest } from './show.extra.db.request'

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
    .required()

}).options({ abortEarly: false });

class ShowProductRequest {
  public static validate = async (body: IProductQueryParams) => {
    await rulesJoi.validateAsync(body)
    await ShowProductExtraDBRequest.validate(body)
  }
}

export { ShowProductRequest }
