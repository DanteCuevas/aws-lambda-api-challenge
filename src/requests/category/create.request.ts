import Joi from 'joi'
import { ICategoryBodyCreate } from '../../interfaces/category.interface'

const rulesJoi = Joi.object({
  name: Joi.string()
    .max(30)
    .required(),

  description: Joi.string()
    .max(200)

}).options({ abortEarly: false });

class CreateCategoryRequest {
  public static validate = async (body: ICategoryBodyCreate) => {
    await rulesJoi.validateAsync(body)
  }
}

export { CreateCategoryRequest }
