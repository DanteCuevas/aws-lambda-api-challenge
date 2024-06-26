import Joi from 'joi'
import { ICategoryQueryParams } from '../../interfaces/category.interface'
import { isValidObjectId } from '../../utils/validation.util'
import { ShowCategoryExtraDBRequest } from './show.extra.db.request'

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

class ShowCategoryRequest {
  public static validate = async (body: ICategoryQueryParams) => {
    await rulesJoi.validateAsync(body)
    await ShowCategoryExtraDBRequest.validate(body)
  }
}

export { ShowCategoryRequest }
