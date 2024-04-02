import Joi from 'joi'
import { IProductFilter } from '../../interfaces/product.interface'

const rulesJoi = Joi.object({
  page: Joi.number()
    .min(1),

  filterName: Joi.string()
    .max(30),

  orderBy: Joi.string()
    .valid('name', 'stock'),

  order: Joi.string()
    .when('orderBy', {
      is: Joi.exist(),
      then: Joi.string().required().valid('asc', 'desc'),
      otherwise: Joi.string().optional()
    })

}).options({ abortEarly: false });

class FilterProductRequest {
  public static validate = async (body: IProductFilter) => {
    await rulesJoi.validateAsync(body)
  }
}

export { FilterProductRequest }
