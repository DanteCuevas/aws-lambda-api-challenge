import Joi from 'joi'
import { ICategoryBodyUpdate } from '../../interfaces/category.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { UpdateCategoryExtraDBRequest } from './update.extra.db.request'

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
    .max(200)

}).options({ abortEarly: false });

class UpdateCategoryRequest {
  public static validate = async (body: ICategoryBodyUpdate) => {
    await rulesJoi.validateAsync(body)
    await UpdateCategoryExtraDBRequest.validate(body)
  }
}

export { UpdateCategoryRequest }
