import Joi from 'joi'
import { ICategoryQueryParams } from '../../interfaces/category.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { DeleteCategoryExtraDBRequest } from './delete.extra.db.request'

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

class DeleteCategoryRequest {
  public static validate = async (body: ICategoryQueryParams) => {
    await rulesJoi.validateAsync(body)
    await DeleteCategoryExtraDBRequest.validate(body)
  }
}

export { DeleteCategoryRequest }
